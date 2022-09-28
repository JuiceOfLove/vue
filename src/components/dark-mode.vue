<template>
    <div class="toggle-wrapper">
        <label class="toggle">
            <input type="checkbox" :checked="(mode === 'dark') ? 'checked' : false" @change="$emit('toggle')">
            <span class="toggler round"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'dark-mode',
    props: ['mode']
}
</script>

<style>
.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggler {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #15202B;
  transition: 0.4s;
}

.toggler:before {
  content: "";
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background: #FFF;
  transition: 0.4s;
}

input:checked + .toggler {
  background: #2196F3;
}
input:focus + .toggler {
  box-shadow: 0 0 2px #2196F3;
}

input:checked + .toggler:before {
  transform: translateX(26px);
}

.toggler.round {
  border-radius: 34px;
}
.toggler.round:before {
  border-radius: 50%;
}
</style>