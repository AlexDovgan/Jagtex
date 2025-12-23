<template>
    <div class="result">Вы ответили правильно  на {{ correctNumber }} вопроса  </div>

    <div v-for="q,qi in questions">
        <div :class="[
            'question',
            q.correctAnswerIndex == props.answers?.[qi]?'correct-answer':'incorrect-answer' 
            ]" >{{ q.text }}</div>
        <div class="answer" v-for="a,ai in q.answers">
            <div :class="[ai==answers?.[qi]?'selected':'',a.isCorrect?'correct':'' ]" >{{ a.text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import Question from "./Question.vue";
const props = defineProps({
    questions: Array<any>,
    answers: Array<Number>,
})
const correctNumber = computed(
    ()=>props.questions?.filter(
        (q:any,qi)=>q.correctAnswerIndex == props.answers?.[qi]
        ).length)
</script>

 
 
<style scoped>
.question
{
    margin: 5mm;
}    
.correct-answer
{
    background-color: aquamarine;
}    
.incorrect-answer
{
    background-color: coral;
}

.answer
{
    margin-left:5mm ;
}
.answer>div
{
    padding: 2px;
    margin-left: 5mm;
}
.correct
{
    background-color:  aquamarine;
   
}
.selected
{
    border-color: coral;
    border-style: solid;
}

</style>
