<template>
  <div class="prepare">
    <div class="title">Готовы присоединиться?</div>
    <div class="buttons">
      <button>Присоединиться</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prepare"
}
</script>

<style lang="scss" scoped>
.prepare {
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  title {
    font-size: 18px;
    text-align: center;
  }
  .sub-title {
    font-size: 14px;
    margin-top: .5rem;
    text-align: center;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: #FF0000;
      border-radius: 40px;
      margin-top: 1rem;
      padding: .5rem 1.5rem;
      transition: all .5s ease;
      color: #ffffff;
      -webkit-box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
      -moz-box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
      box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
    }
  }
}
</style>