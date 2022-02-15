<template>
  <div class="prepare">
    <h2>Готовы присоединиться?</h2>
    <span class="sub-title">Пока ничего нет</span>
    <div class="buttons">
      <button>Присоединиться</button>
      <button>Показать</button>
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
  h2 {
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
      width: 100%;
      background: #c3ab7c;
      border-radius: 8px;
      margin-top: 1rem;
      padding: .5rem 1rem;
      transition: all .5s ease;
      &:last-child {
        background: transparent;
        margin-left: .5rem;
      }
      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
}
</style>