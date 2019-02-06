<template>
<section class="admin">
  <Bouncer v-if="!logged" />
  <div class="admin__main" v-else>
    <ul class="admin__list">
      <li class="admin__item" v-for="fruit in fruits" :key="fruit.name">
        <div>
          <i>
            <img :src="`/img/icons/${fruit.name}.svg`" :alt="fruit.name">
          </i>
          <p>{{fruit.name}}</p>
        </div>
        <div class="toggle">
          <input type="checkbox" :id="fruit.name">
          <label :for="fruit.name" @click="toggleFruit"></label>
        </div>
      </li>
    </ul>
    <div class="admin__buttons">
      <button class="back" @click="$router.push('/')"><img src="../assets/negative.svg" alt=""></button>
      <button class="submit" @click="submit"><img src="../assets/positive.svg" alt=""></button>
    </div>
  </div>
</section>
</template>

<script>
import Bouncer from '../components/Bouncer';

export default {
	name: 'Admin',
	components: {
		Bouncer
	},
	data() {
		return {
			list: []
		}
	},
	computed: {
		fruits() {
			return this.$store.state.fruits;
		},
		logged() {
			return this.$store.state.logged;
		}
	},
	methods: {
		submit() {
			this.$store.dispatch('submitFruit', this.list).then(() => {
				console.log('Fruta do Dia submetida!');
				this.$router.push('/');
			});
		},
		toggleFruit(event) {
			const isChecking = !event.currentTarget.previousElementSibling.checked;
			const selectedFruit = event.currentTarget.getAttribute('for');
			if (isChecking) {
				if (this.list.length === 2) event.preventDefault();
				else this.list.push(selectedFruit);
			} else this.list.splice(this.list.indexOf(selectedFruit), 1);
		}
	}
}
</script>

<style lang="scss">
.admin {
    height: auto;
    max-width: 800px;
    margin: 0 auto;
    &__list {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        padding-bottom: 80px;
        li + li {
            border-top: 1px solid lightgrey;
        }
    }
    &__item {
        width: 100%;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        i {
            height: 60px;
            width: 50px;
            margin-right: 20px;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
        }
        p {
            font-family: Quicksand;
            font-size: 16px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    &__buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80px;
            color: white;
            border: 0;
            padding: 0;
            margin: 0;
            -webkit-appearance: none;
            cursor: pointer;
            img {
                max-width: 40px;
            }
            &.back {
                background-color: var(--red);
                flex: 1;
            }
            &.submit {
                background-color: var(--green);
                flex: 2;
            }
        }
    }
}
.toggle {
    label {
        width: 60px;
        height: 32px;
        border-radius: 16px;
        background-color: var(--gray);
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        transition: background-color 0.2s ease-in;
        cursor: pointer;
        position: relative;
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 2px;
            left: 2px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: white;
            box-shadow: 0 2px 4px 0 rgba(gray, 0.35);
            transition: left 0.1s ease-in;
        }
    }
    input:checked ~ label {
        background-color: var(--green);
        &:after {
            left: 30px;
        }
    }
    input {
        display: none;
    }
}
</style>
