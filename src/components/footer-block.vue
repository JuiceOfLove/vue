<template>
    <footer>
        <div class="footer__block">
            <span> {{ text }} </span>
            <div></div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'footer-block',
    data() {
        return {
             text: 'Цыбуленко Андрей Александрович, 211-323',
        }
    }
}
</script>

<style scoped>
footer {
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
    align-items: center;
    text-align: center;
    border: 2px solid black;
    margin-top: 10px;
    padding: 10px;
    width: min(100% - 2rem, 800px);
    margin-inline: auto;
}
</style>