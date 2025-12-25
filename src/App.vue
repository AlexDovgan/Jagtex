<template>
     <v-container >
          <p v-if="stateStore.pending">Загрузка...</p>

          <question  v-else-if="!stateStore.pending && !stateStore.finished" :question="stateStore.currentQuestion"
               :questionNumber="stateStore.questionIndex + 1" @answer="answerQuestion" :key="stateStore.questionIndex" />
          <result  v-else-if="stateStore.finished" :questions="stateStore.questions" :answers="stateStore.answers" />
     </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useQuizzStore } from "./stores/quizz"
import Question from "./components/Question.vue"
import Result from "./components/Result.vue"


const stateStore = useQuizzStore();

const answerQuestion = (answer: Array<Number> | Number) => {
     if (!stateStore.finished)
          stateStore.answerQuestion(answer)
       
}

</script>



<style scoped></style>
