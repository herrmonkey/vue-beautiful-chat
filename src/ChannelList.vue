<template>
  <div class="channel-list">
    <table class="" style="padding-top: 5px">
      <tbody>
        <tr v-for="(channel,i) in channels" :key="i">
          <button @click="setChannelId(i)" style="background: transparent; border-color: transparent;">
            <td style="text-align: center;"><img :src="channel.titleImageUrl" class="img-msg"/></td>
            <td class="channel-element">{{channel.title}}</td>
            <td v-if="channel.newMessagesCount > 0"><span class="sc-new-messsages-count">{{channel.newMessagesCount}}</span></td>
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
  .sc-new-messsages-count {
     position: absolute;
     margin-top: -5px !important;
     left: 48px;
     display: flex;
     justify-content: center;
     flex-direction: column;
     border-radius: 50%;
     width: 22px;
     height: 22px;
     background: #ff4646;
     color: white;
     text-align: center;
     margin: auto;
     font-size: 12px;
     font-weight: 500;
   }


</style>
