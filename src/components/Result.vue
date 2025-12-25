<template>
    <v-sheet :class="correctNumber! >= 19 ? 'bg-green-lighten-3' : 'bg-red-lighten-3'">
        <div>Вы ответили правильно на {{ correctNumber }} {{ correctNumber == 1 ? 'вопрос' : 'вопроса' }} </div>

        <div v-if="correctNumber! >= 19"> Вы сдали тест </div>
        <div v-if="correctNumber! < 19"> Вы не сдали тест </div>
    </v-sheet>
    <v-row v-for="q, qi in questions" class="ma-5">
        <v-card class="w-100">
            <v-card-title
                :class="q.correctAnswerIndex == props.answers?.[qi] ? 'bg-green-lighten-3' : 'bg-red-lighten-3'">{{
                    q.text
                }}
            </v-card-title>
            <v-sheet v-for="a, ai in q.answers" class="ma-2"
                :border="ai == answers?.[qi] ? 'error red-lighten-3 xl' : ''">
                <v-card-text :class="a.isCorrect ? 'bg-green-lighten-3' : ''">
                    <div>{{ a.text }}</div>
                </v-card-text>
            </v-sheet>
        </v-card>
    </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import Question from "./Question.vue";
const props = defineProps({
    questions: Array<any>,
    answers: Array<Number>,
})
const correctNumber = computed(
    () => props.questions?.filter(
        (q: any, qi) => q.correctAnswerIndex == props.answers?.[qi]
    ).length)
</script>



<style scoped>
.correct {
    background-color: aquamarine;
}

.incorrect {
    background-color: coral;
}

.answer {
    margin-left: 5mm;
}

.answer>div {
    padding: 2px;
    margin-left: 5mm;
}

.correct {
    background-color: aquamarine;

}

.selected {
    border-color: coral;
    border-style: solid;
}
</style>
