<template>
  <div class="training">
    <h1>Math training. Level {{ level + 1 }}</h1>
    <hr>
    <div class="progress">
      <div class="progress-bar" :style="progressStyles"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <app-start-screen 
          v-if="state == 'start'" 
          @onStart="onStart"
        >
        </app-start-screen>
        <app-question 
          v-else-if="state == 'question'"
          @success = "onQuetionSuccess"
          @error = "onQuetionError"
          :settings="levels[level]"
        >
        </app-question>
        <app-message 
          v-else-if="state == 'message'"
          :type="message.type"
          :text="message.text"
          @onNext = "onNext"
        >
        </app-message>
        <app-result-screen 
          v-else-if="state == 'result'"
          :stats="stats"
          :level="level"
          :length="levels.length"
          :settings="levels[level]"
          :type="message.type"
          @repeat = "onStart"
          @nextLevel = "onNextLevel"
          @prevLevel = "onPrevLevel"
          @repeatTraining = "onRepeatTraining"
        >
        </app-result-screen>
        <div v-else>Unknown state</div>
      </transition> <!-- Конец transition -->
    </div> <!-- Конец .box -->
  </div> <!-- Конец .training -->
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      state: 'start',
      stats: {
        success: 0,
        error: 0
      },
      message: {
        type: '',
        text: ''
      },
      level: 0,
      levels: [
        {
          from: 10,
          to: 40,
          range: 4,
          questionMax: 2,
          variants: 2
        },
        {
          from: 100,
          to: 200,
          range: 20,
          questionMax: 3,
          variants: 4
        },
        {
          from: 500,
          to: 900,
          range: 40,
          questionMax: 4,
          variants: 6
        },
        {
          from: 1000,
          to: 1800,
          range: 30,
          questionMax: 5,
          variants: 7
        }
      ]
    }
  },
  computed: {
    questionDone(){
      return this.stats.success + this.stats.error;
    },
    progressStyles(){
      return {
        width: (this.questionDone / this.levels[this.level].questionMax * 100) + '%'
      };
    },
    levelsLength(){
      return this.levels.length;
    }
  },
  methods: {
    onStart(){
      this.state = 'question';
      this.stats.success = 0;
      this.stats.error = 0;
    },
    onQuetionSuccess(){
      this.state = 'message';
      this.message.text = 'Good Job!';
      this.message.type = 'success';
      this.stats.success++;
    },
    onQuetionError(msg){
      this.state = 'message';
      this.message.text = msg;
      this.message.type = 'warning';
      this.stats.error++;
    },
    onNext(){
      if(this.questionDone < this.levels[this.level].questionMax) {
        this.state = 'question';
      } else {
        this.state = 'result';
      }
    },
    onNextLevel(){
      if(this.level == this.levelsLength - 1) {
        this.level = 0;
      }  else {
        this.level++;
      }
      this.onStart();
    },
    onPrevLevel(){
      this.level--;
      this.onStart();
    },
    onRepeatTraining(){
      this.level = 0;
      this.onStart();
    }
  }
}
</script>

<style lang="scss" scoped>
  .training {
    max-width: 700px;
    margin: 20px auto 0;
  }

  .box {
    margin: 10px 0;
  }

  .flip-enter-active {
    animation: flipInX .3s linear;
  }

  .flip-leave-active {
    animation: flipOutX .3s linear;
  }

  @keyframes flipInX{
    from{transform: rotateX(90deg);}
    to{transform: rotateX(0deg);}
  }

  @keyframes flipOutX{
    from{transform: rotateX(0deg);}
    to{transform: rotateX(90deg);}
  }
</style>
