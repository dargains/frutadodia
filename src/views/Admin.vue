<template>
  <section class="admin">
    <ul class="admin__list">
      <li class="admin__item" v-for="fruit in fruits" :key="fruit">
        <p>{{fruit.name}}</p>
        <div class="toggle">
          <input type="checkbox" :id="fruit">
          <label :for="fruit" @click="toggleFruit"></label>
        </div>
      </li>
    </ul>
    <div class="admin__buttons">
      <button class="back" @click="$router.push('/')">Voltar</button>
      <button class="submit" @click="submit">Submeter</button>
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
  &__list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
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
    p {
      &:before {
        content: attr(data-icon);
        margin-right: 10px;
        width: 40px;
        height: 60px;
        display: inline-block;
        vertical-align: middle;
        background-color: lightgrey;
      }
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      color: white;
      &.back {
        background-color: var(--red);
      }
      &.submit {
        background-color: var(--green);
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
