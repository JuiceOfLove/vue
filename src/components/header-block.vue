<template>
    <header>
        <div class="header__inner">
            <div class="header__title"><span> {{ title }} </span></div>
            <div class="header__dark-theme">
                <dark-mode :mode="mode" @toggle="$emit('toggle')"></dark-mode>
            </div>
        </div>
    </header>

</template>

<script>
import darkMode from './dark-mode.vue'
export default {
  components: { darkMode },
    name: 'header-block',
    props: ['mode'],
    data() {
        return {
            title: "Vue order",
        }
    }
}
</script>

<style>

header {
    display: flex;
    justify-content: flex-end;
    width: min(100% - 2rem, 800px);
    margin-inline: auto;
    padding-top: 5px;
    align-items: center;
    text-align: center;
    border: 2px solid black;


    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.header__inner {
    display: flex;
    justify-content: space-between;
    width: 54%;
    align-items: center;
    /* margin: 0; */

}


</style>