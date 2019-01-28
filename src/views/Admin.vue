<template>
  <section class="admin">
    <ul class="admin__list">
      <li class="admin__item" v-for="fruit in fruits" :key="fruit.name">
        <div>
          <i>
            <img :src="`/img/fruits/icons/${fruit.name}.png`" :alt="fruit.name">
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
  </section>
</template>

<script>
  export default {
    name: 'Admin',
    data() {
      return {
        list: []
      }
    },
    computed: {
      fruits() {
        return this.$store.state.fruits;
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('submitFruit', this.list).then(() => {
          alert('Fruta do Dia submetida!')
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
    position: fixed;
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
		width: 47px;
		height: 27px;
		border-radius: 14px;
		background-color: lightgrey;
		display: inline-block;
		vertical-align: middle;
		margin-left: 5px;
		transition: background-color .2s ease-in;
		cursor: pointer;
		position: relative;
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 3px;
			left: 3px;
			width: 21px;
			height: 21px;
			border-radius: 12px;
			background-color: white;
			box-shadow: 0px 2px 4px 0 rgba(gray, 0.35);
			transition: left .1s ease-in;
		}
	}
	input:checked ~ label {
    background-color: var(--green);
    &:after {
      left: 23px;
    }
	}
	input {
		display: none;
	}
}
</style>
