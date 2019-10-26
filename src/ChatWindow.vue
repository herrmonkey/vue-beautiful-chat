<template>
  <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
    <Header
            :title="title"
            :imageUrl="titleImageUrl"
            :onClose="onClose"
            :onBack="onBack"
            :colors="colors"
            :chatWindowState="chatWindowState"
            :onShowUsers="onShowUsers"
    >
      <template>
        <slot name="header">
        </slot>
      </template>
    </Header>
    <template v-if="chatWindowState==1">
      <ChannelList
              :channels="channels"
              @setChannelId="setChannelId"
      />
    </template>
    <template v-if="chatWindowState>1">
      <UserList
              v-if="chatWindowState==3"
              :participants="channels[channelid].participants"
      />
      <MessageList
              v-if="chatWindowState==2"
              :messages="channels[channelid].messageList"
              :participants="channels[channelid].participants"
              :showTypingIndicator="showTypingIndicator"
              :colors="colors"
              :alwaysScrollToBottom="alwaysScrollToBottom"
              :messageStyling="messageStyling"
              @scrollToTop="$emit('scrollToTop')"
              @remove="$emit('remove', $event)"
      >
        <template v-slot:user-avatar="scopedProps">
          <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message">
          </slot>
        </template>
        <template v-slot:text-message-body="scopedProps">
          <slot name="text-message-body" :message="scopedProps.message" :messageText="scopedProps.messageText" :messageColors="scopedProps.messageColors" :me="scopedProps.me">
          </slot>
        </template>
        <template v-slot:system-message-body="scopedProps">
          <slot name="system-message-body" :message="scopedProps.message">
          </slot>
        </template>
        <template v-slot:text-message-toolbox="scopedProps">
          <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
          </slot>
        </template>
      </MessageList>
      <UserInput
              v-if="chatWindowState==2"
              :showEmoji="showEmoji"
              :onSubmit="onUserInputSubmit"
              :suggestions="getSuggestions()"
              :showFile="showFile"
              :placeholder="placeholder"
              @onType="$emit('onType')"
              @edit="$emit('edit', $event)"
              :colors="colors" />
    </template>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import MessageList from './MessageList.vue'
  import UserInput from './UserInput.vue'
  import UserList from './UserList.vue'
  import ChannelList from './ChannelList.vue'

  export default {
    components: {
      Header,
      MessageList,
      UserInput,
      UserList,
      ChannelList
    },
    props: {
      showEmoji: {
        type: Boolean,
        default: false
      },
      showFile: {
        type: Boolean,
        default: false
      },
      channels: {
        type: Array,
        required: true
      },
      participants: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      titleImageUrl: {
        type: String,
        default: ''
      },
      onUserInputSubmit: {
        type: Function,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      },
      messageList: {
        type: Array,
        default: () => []
      },
      isOpen: {
        type: Boolean,
        default: () => false
      },
      placeholder: {
        type: String,
        default: 'Write a message...'
      },
      showTypingIndicator: {
        type: String,
        required: true
      },
      colors: {
        type: Object,
        required: true
      },
      alwaysScrollToBottom: {
        type: Boolean,
        required: true
      },
      messageStyling: {
        type: Boolean,
        required: true
      },
      disableUserListToggle: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showUserList: false,
        showChannelList: true,
        channelid: null,
        chatWindowState: 1
      }
    },
    computed: {
      messages() {
        let messages = this.channels[this.channelid].messageList
        return messages
      }
    },
    methods: {
      onShowUsers() {
        if(this.chatWindowState==2){
          this.chatWindowState=3
          console.log(this.channels[this.channelid].participants)
        }else if(this.chatWindowState==3){
          this.chatWindowState=2
        }

      },
      handleChannelListToggle(showChannelList) {
        this.showChannelList = showChannelList
      },
      getSuggestions(){
        return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
      },
      setChannelId(channel_id){
        this.chatWindowState = 2
        this.channelid = channel_id
      },
      onBack(){
        if(this.chatWindowState>1){
          this.chatWindowState-=1
        }
      }
    }
  }
</script>
<style scoped>
  .sc-chat-window {
    width: 370px;
    height: calc(100% - 120px);
    max-height: 590px;
    position: fixed;
    right: 25px;
    bottom: 100px;
    box-sizing: border-box;
    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    animation: fadeIn;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
  }

  .sc-chat-window.closed {
    opacity: 0;
    display: none;
    bottom: 90px;
  }

  @keyframes fadeIn {
    0% {
      display: none;
      opacity: 0;
    }

    100% {
      display: flex;
      opacity: 1;
    }
  }

  .sc-message--me {
    text-align: right;
  }
  .sc-message--them {
    text-align: left;
  }

  @media (max-width: 450px) {
    .sc-chat-window {
      width: 100%;
      height: 100%;
      max-height: 100%;
      right: 0px;
      bottom: 0px;
      border-radius: 0px;
    }
    .sc-chat-window {
      transition: 0.1s ease-in-out;
    }
    .sc-chat-window.closed {
      bottom: 0px;
    }
  }
</style>
