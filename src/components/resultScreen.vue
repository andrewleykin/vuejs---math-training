<template>
	<div class="alert" :class="'alert-' + type">
		<h3>Success: {{ stats.success }}</h3>
		<h3>Error: {{ stats.error }}</h3>
		<hr>
		<button class="btn btn-primary" @click="$emit('repeat')"v-if="progressQuestionRepeat">
			Repeat
		</button>
		<!-- попытка сделать перезапуск всей тренировки в конце -->
		<!-- <button class="btn btn-primary" 
			@click="$emit('repeatTraining')"
			v-if="progressTraining"
		>
			Repeat Trainnig
		</button> -->
		<button class="btn btn-primary" @click="$emit('nextLevel')" v-if="progressQuestion">
			{{ buttonMessage}}
		</button>
		<button class="btn btn-primary" 
			v-if="prevLevels"
			@click="$emit('prevLevel')"
		>
			Prev Level
		</button>
	</div>
</template>

<script>
	export default {
		props: ['stats', 'level', 'settings', 'type', 'length'],
		data () {
			return {
				buttonMessage: "Next Level"
			}
		},
		computed: {
			prevLevels(){
				if(this.level == this.length - 1) {
					return false;
				} else if(this.level == 0) {
					return false;
				} else {
					return true;
				}
			},
			progressQuestion(){
				if(this.stats.error == this.settings.questionMax) {
					this.type = 'warning';
					return false
				} else if(this.stats.error > this.stats.success){
					this.type = 'warning';
					return false
				} else {
					this.type = 'primary';
					if(this.level == this.length - 1) {
						this.buttonMessage = "Repeat Trainnig"
					}
					return true
				}

			},
			progressQuestionRepeat(){
				if(this.level == this.length - 1) {
					return false
				} else {
					return true;
				}
			}
			// попытка сделать перезапуск всей тренировки в конце
			// progressTraining(){
			// 	if(this.level == this.length - 1) {
			// 		return true
			// 	} else {
			// 		return false
			// 	}
			// }
		}
	}
</script>

<style>
	.btn {
		margin: 20px 0;
	}
</style>