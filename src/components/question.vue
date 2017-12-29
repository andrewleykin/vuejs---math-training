<template>
	<div class="alert">
		<h3>{{ x }} + {{ y }} = ?</h3>
		<hr>
		<div class="buttons">
			<button class="btn btn-success" 
				v-for="number in answer"
				@click="onAnswer(number)"
			>
				{{ number }}
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['settings'],
		data(){ // данные
			return {
				x: mtRand(this.settings.from, this.settings.to),
				y: mtRand(this.settings.from, this.settings.to)
			}
		},
		computed: { // вычисляемые свойства
			good(){ // правильный ответ
				return this.x + this.y;
			},
			answer(){ // набор ответов
				let res = [this.good]; // массив

				// цикл для набора чисел
				while(res.length < this.settings.variants){
					// числа не будут сильно отличаться от хорошего
					let num = mtRand(this.good - this.settings.range, this.good + this.settings.range);

					// если такого же числа нету, то добавить в массив
					if(res.indexOf(num) === -1) {
						res.push(num);
					}
				}

				// вернуть массив с рандомным положением элементов
				return res.sort(function(){
					return Math.random() > 0.5;
				});
			}
		},
		methods: { // методы
			onAnswer(num) {
				if(num == this.good) {
					this.$emit('success');
				} else {
					this.$emit('error', `${this.x} + ${this.y} = ${this.good}!`);
				}
			}
		}
	}

	// функция для рандомного положения
	function mtRand(min, max) {
		let diff = max - min;
		return Math.floor(Math.random() * (diff + 1)) + min;
	}
</script>

<style scoped lang="scss">
	.alert {
		padding-top: 20px;
		background: #eee;
	}

	.buttons {
		display: flex;
		-webkit-justify-content: space-around;
		        justify-content: space-around;
	}

	.btn {
		margin: 20px 0;
	}
</style>