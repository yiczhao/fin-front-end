export default {
    // 使用方式 <element v-auth:pricode ></element>
    bind: function () {
        let privileges = JSON.parse(sessionStorage.getItem('user_data')).privileges;
        if (privileges && privileges.length > 0) {
            let indexof = privileges.indexOf(this.arg.toUpperCase());
            if (indexof == -1) this.el.style.display = "none";
        }
        else
            this.el.style.display = "none";
    },

    unbind: function () {

    },
    update: function () {

    }

}
