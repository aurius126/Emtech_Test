<template>
    <div class="half-doughnut" style="height: 300px">
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'UiBar',
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
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart.getContext('2d'), {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Alumnos por curso',
                        data: this.data,
                        backgroundColor: this.colors,
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