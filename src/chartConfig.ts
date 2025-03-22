import type { TooltipItem } from 'chart.js'

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Hours',
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
      },
      ticks: {
        callback(value: string | number) {
          const hour = Number.parseInt(value.toString(), 10)
          const period = hour >= 12 ? 'PM' : 'AM'
          const formattedHour = hour % 12 || 12
          return `${formattedHour} ${period}`
        },
        font: {
          size: 10,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Average Number of Cars',
        font: {
          size: 10,
        },
      },
      ticks: {
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        font: {
          size: 12,
        },
        usePointStyle: true,
        pointStyle: 'rect',
      },
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#333',
      bodyColor: '#666',
      borderColor: '#ddd',
      borderWidth: 1,
      cornerRadius: 6,
      padding: {
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
      },
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      callbacks: {
        label(tooltipItem: TooltipItem<'bar'>) {
          return `\u00A0 ${(tooltipItem.raw as number).toFixed(2)} cars/hour`
        },
        title(tooltipItems: TooltipItem<'bar'>[]) {
          const hour = Number.parseInt(tooltipItems[0].label, 10)
          const period = hour >= 12 ? 'PM' : 'AM'
          const formattedHour = hour % 12 || 12
          return `${formattedHour} ${period}`
        },
      },
    },
  },

  animation: {
    duration: 1500,
    easing: 'easeOutQuart' as const,
    delay: 0,
  },
}
