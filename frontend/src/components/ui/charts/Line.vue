<template>
    <div class="half-doughnut" style="height: 300px">
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'UiLine',
    props: {
        labels: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        secondLine:{
            type: Array,
            required: true,
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart.getContext('2d'), {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Alumnos por periodo',
                        data: this.data,
                        backgroundColor: this.colors,
                    },
                    {
                        label: 'Alumnos inactivos por periodo',
                        data: this.secondLine.data,
                        backgroundColor: this.secondLine.colors,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
        });
    },
};
</script>

<style scoped>
canvas {
    width: 100% !important;
    height: 400px !important;
}
</style>