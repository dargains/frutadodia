<template lang="html">
  <section class="bouncer" ref="bouncer">
    <h2>Acesso restrito</h2>
    <p>Se não és a Gafanha baza daqui. As consequências de ficares são fatais.</p>
    <div class="bouncer__input" :class="{error}">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @click="error = false" @keyup.enter="submit">
    </div>
    <div class="bouncer__buttons">
      <button class="back" @click="$router.push('/')"><img src="../assets/negative.svg" alt=""></button>
      <button class="submit" @click="submit"><img src="../assets/positive.svg" alt=""></button>
    </div>
  </section>
</template>

<script>
export default {
	name: 'Bouncer',
	data() {
		return {
			password: '',
			error: false
		}
	},
	mounted() {
		this.$refs.bouncer.style.height = window.innerHeight + 'px';
	},
	methods: {
		submit() {
			this.error = false;
			if (this.password === 'Gafanha') this.$store.commit('login');
			else this.error = true;
		}
	}
}
</script>

<style lang="scss">
.bouncer {
    height: 100vh;
    background-color: var(--white);
    color: var(--black);
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    h2 {
        font-size: 90px;
        line-height: 0.8;
        margin: 0 0 60px;
        letter-spacing: 4.5px;
    }
    p {
        font-size: 16px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        margin-left: 50px;
        letter-spacing: 1px;
        line-height: 1.2;
    }
    &__input {
        margin: 60px auto;
        font-family: 'Quicksand', sans-serif;
        label {
            color: var(--black);
            font-size: 14px;
            position: absolute;
            left: 10px;
            top: -15px;
        }
        input {
            border: 0;
            color: var(--black);
            border-bottom: 1px solid currentColor;
            padding: 5px 10px;
            font-size: 16px;
            background-color: transparent;
            width: 230px;
            border-radius: 0;
        }
        &.error {
            input,
            label {
                color: var(--red);
            }
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
</style>
