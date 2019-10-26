<template>
  <div class="channel-list">
    <table class="" style="padding-top: 5px">
      <tbody>
        <tr v-for="(channel,i) in channels" :key="i">
          <button @click="setChannelId(i)">
            <td style="text-align: center;"><img :src="channel.titleImageUrl" class="img-msg"/></td>
            <td class="channel-element">{{channel.title}}</td>
            <td class="channel-element"> Nuevos mensajes:{{channel.newMessagesCount}}</td>
          </button>
        </tr>
      </tbody>
  </table>
  </div>
</template>
<script>
export default {
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  methods:{
    setChannelId(channel_id){
      this.$emit('setChannelId',channel_id)
    }
  }
}
</script>
<style scoped>
  .channel-list {
    height: 100%;
    overflow: auto;
    padding-left: 5px;
    padding-top: 8px;
  }
  .img-msg {
    border-radius: 50%;
    width: 50px;
    margin-right: 5px;
  }
  .channel-element {
    font-size: 20px;
    vertical-align: middle;
  }
</style>
