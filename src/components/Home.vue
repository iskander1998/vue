<template>
  <Header />
  <h1>Привет {{ userinfo.name }}, список всех заметок:</h1>
  <div>Кликните по заголовку или тексту для редактирования заметки</div>
  <p></p>
  <div class="note">
    <div class="item" v-for="(note, index) in notes1" v-bind:key="index">
      <teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            <div class="title">Подтверждаете удаление ?</div>
            <p></p>
            <button class="btnYes" @click="removeNote(index)">OK</button>
            <button class="btnNo" @click="modalOpen = false">Отмена</button>
          </div>
        </div>
      </teleport>
      <button class="del_but" @click="modalOpen = true">X</button>
      <button class="upd_but" @click="editState[index] = !editState[index]">
        ✒️
      </button>
      <div class="title_field">
        <div class="button" @click="editState[index] = !editState[index]">
          {{ note }}
        </div>
      </div>
      <p></p>
      <div class="text" v-show="editState[index]">
        Изменить заголовок заметки:
        <p></p>
        <input
          class="input_text"
          type="text"
          name="name"
          placeholder="Введите название заметки"
          v-model="this.notes1[index]"
        />
        <p></p>
        Изменить текст заметки:
        <p></p>
        <input
          class="input_text"
          type="text"
          name="name"
          placeholder="Введите текст заметки"
          v-model="this.notesText[index]"
        />
        Изменить задачи:
        <p></p>
        <input
          class="input_text"
          type="text"
          name="name"
          placeholder="Введите текст заметки"
          v-model="this.tasks[index]"
        />
        <button class="sv_but" @click="updateNotes(index)">💾</button>
        <button class="cn_but" @click="cancelNotes(index)">⛔</button>
      </div>
      <p @click="editState[index] = !editState[index]" class="text_field">
        {{ notesText[index] }}
        {{ tasks[index] }}
      </p>
      <p></p>
      <p></p>
    </div>
  </div>
</template>
<script>
import Header from "./Header.vue";
export default {
  name: "Home",
  data() {
    return {
      name: "",
      notes: [],
      notes1: [],
      notesText: [],
      tasks: [],
      newText: null,
      newNote: null,
      modalOpen: false,
      userinfo: [],
      editState: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    if (localStorage.getItem("notes1")) {
      try {
        this.notes1 = JSON.parse(localStorage.getItem("notes1"));
      } catch (e) {
        localStorage.removeItem("notes1");
      }
    }
    if (localStorage.getItem("notesText")) {
      try {
        this.notesText = JSON.parse(localStorage.getItem("notesText"));
      } catch (e) {
        localStorage.removeItem("notesText");
      }
    }
    if (localStorage.getItem("user-info")) {
      try {
        this.userinfo = JSON.parse(localStorage.getItem("user-info"));
      } catch (e) {
        localStorage.removeItem("user-info");
      }
    }
    if (localStorage.getItem("tasks")) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      } catch (e) {
        localStorage.removeItem("tasks");
      }
    }
  },
  components: {
    Header,
  },
  methods: {
    addNote() {
      if (!this.newNote && !this.newText) {
        return;
      }
      this.notes1.push(this.newNote);
      this.newNote = "";
      this.notesText.push(this.newText);
      this.newText = "";
      this.saveNotes();
    },
    removeNote(x) {
      this.modalOpen = false;
      this.notes1.splice(x, 1);
      this.notesText.splice(x, 1);
      this.editState.splice(x, 1);
      this.saveNotes();
    },
    saveNotes() {
      let parsed1 = JSON.stringify(this.notes1);
      localStorage.setItem("notes1", parsed1);
      let parsedText = JSON.stringify(this.notesText);
      localStorage.setItem("notesText", parsedText);
      let parsedState = JSON.stringify(this.editState);
      localStorage.setItem("editState", parsedState);
    },
    updateNotes(x) {
      this.notes1.x = JSON.stringify(this.notes1[x]);
      this.notesText.x = JSON.stringify(this.notesText[x]);
      this.editState[x] = false;
      this.saveNotes();
    },
    cancelNotes() {
      this.notesText = JSON.parse(localStorage.getItem("notesText"));
      this.notes1 = JSON.parse(localStorage.getItem("notes1"));
    },
  },
};
</script>
<style>
td {
  width: 160px;
  height: 40px;
}

.titles {
  color: Black;
  font-size: 18px;
}

.note {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
}

.note .item {
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 0.1%;
  padding-left: 5%;
  padding-right: 0.1%;
  text-align: left;
  background-color: #c1c1c1;
  overflow: hidden;
  font-size: 100%;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: 1s;
}
.note .item:hover {
  transform: scale(1.1);
}
.note .item .update {
  position: absolute;
  left: 1;
  bottom: 0;
  right: 1;
  top: 1;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.note .item .upd_but {
  position: absolute;
  left: 1;
  bottom: 0;
  right: 0;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.note .item .sv_but {
  position: absolute;
  right: 10%;
  bottom: 0;
  top: 1;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.note .item .cn_but {
  position: absolute;
  right: 20%;
  bottom: 0;
  top: 1;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.note .item .del_but {
  position: absolute;
  left: 1;
  bottom: 1;
  right: 0;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.del_but:before,
.upd_but:before,
.sv_but:before,
.cn_but:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.del_but:active,
.upd_but:active,
.sv_but:active,
.cn_but:active {
  color: #d60000;
}

.del_but:active:after,
.upd_but:active:after,
.sv_but:active:after,
.cn_but:active:after {
  background: transparent;
}

.del_but:hover:before,
.upd_but:hover:before,
.sv_but:hover:before,
.cn_but:hover:before {
  opacity: 1;
}

.del_but:after,
.upd_but:after,
.sv_but:after,
.cn_but:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
/*  */
/* СТИЛИ ОГЛАВЛЕНИЯ И ВВОДА ТЕКСТА В ЭКЗМЕПЛЯРЕ ЗАМЕТКИ */
/*  */
.title_field {
  color: black;
  padding-top: 3%;
  padding-right: 20px;
  width: 90%;
  font-size: 25px;
  font-weight: 600;
  word-wrap: break-word;
}
.text_field {
  padding-top: 3%;
  padding-right: 20px;
  width: 90%;
  word-wrap: break-word;
}
.input_text {
  padding-top: 3%;
  padding-right: 20px;
  width: 90%;
  word-wrap: break-word;
}
/*  */
/* СТИЛИ МОДАЛЬНОГО ОКНА */
/*  */
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@font-face {
  font-family: "San Francisco";
  src: url("https://example.com/fonts/SanFrancisco.ttf") format("truetype");
}
.modal .title {
  font-size: 17pt;
  font-weight: 500;
  font-family: "San Francisco";
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 350px;
  height: 150px;
  padding: 5px;
  text-align: center;
  border-color: black;
  border-radius: 10px;
  position: relative;
}
.modal .btnYes {
  font-size: 17pt;
  position: absolute;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 180px;
  height: 45px;
  display: flex;
  color: #0376f5;
  background-color: #c1c1c1;
  border-color: #c1c1c1;
  justify-content: center;
  cursor: pointer;
  border-bottom-right-radius: 10px;
}
.modal .btnNo {
  font-size: 17pt;
  position: absolute;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 180px;
  height: 45px;
  display: flex;
  color: #0376f5;
  background-color: #c1c1c1;
  border-color: #c1c1c1;
  justify-content: center;
  cursor: pointer;
  border-bottom-left-radius: 10px;
}
</style>
