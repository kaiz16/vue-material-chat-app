<template>
    <div 
        class="md-layout" 
        v-bind:class="{'md-alignment-center-left': isMe == false, 'md-alignment-center-right': isMe == true}">
        <div class="avatar md-layout-item" v-if="!isMe">
            <md-avatar class="md-avatar-icon md-primary">{{message.userName[0].toUpperCase()}}</md-avatar>
        </div>
        <div class="text-and-date md-layout-item" v-bind:class="{'is-me' : isMe}">
            <md-content class="md-primary text">
                {{message.text}}
            </md-content>
            <span class="md-caption date">Today at 5:00 PM</span>
        </div>
        <div class="avatar md-layout-item" v-if="isMe">
            <md-avatar class="md-avatar-icon md-primary">{{message.userName[0].toUpperCase()}}</md-avatar>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    computed: {
        isMe(){
            return sessionStorage.getItem('userName') == this.message.userName
        }
    }
}
</script>

<style scoped>
.avatar{
    flex: 0 1;
}
.text-and-date {
    margin: 0.7em;
    max-width: 50%;
}
.text{
    border-radius: 5px;
    padding: 15px;
    color: #fff;
    width: fit-content;
    /* min-width: 50%; */
}

.is-me {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>