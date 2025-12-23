
<template>
    <p v-if="result.pending">Загрузка...</p>

    <question v-else-if ="!result.pending && !result.finished"
         :question = "result.currentQuestion" :questionNumber ="result.questionIndex+1"  @answer ="answerQuestion" :key="result.questionIndex" />
    <result v-else-if ="result.finished"
         :questions = "result.questions" 
         :answers = "result.answers"/>

</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import {useQuizzStore} from "./stores/quizz"
import Question from "./components/Question.vue"
import Result from "./components/Result.vue"


const  result = useQuizzStore();

const answerQuestion= (answer:Array<Number>|Number)=>{
  if(!result.finished)
    result.answerQuestion(answer)
} 

</script>



<style scoped></style>
