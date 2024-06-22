<template>
    <div class="half-doughnut" style="height: 300px">
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'UiDoughnut',
    props: {
        labels:{
            type: Array,
            required: true,
        },
        data:{
            type: Array,
            required: true,
        },
        colors:{
            type: Array,
            required: true,
        }
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: this.colors,
                    },
                ],
            },
            options: {
                rotation: -90,
                circumference: 180,
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    },
};
</script>