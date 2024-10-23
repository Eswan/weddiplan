import * as Highcharts from 'highcharts';

export default {
  chart: {
    type: 'pie',
    backgroundColor: 'transparent'
  },
  colors: ['#64bbb2', '#cc8b8a', '#008c7f', '#dd716b', '#006d5e', '#e0ac08'],
  title: {
    text: undefined
  },
  credits: {
    enabled: false // Désactive l'affichage du logo Highcharts
  },
  plotOptions: {
    pie: {
      innerSize: '70%',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  legend: {
    enabled: true,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    width: 150,
    labelFormatter: function() {
      const suffix = (this as any).series.chart.options.accessibility?.point?.valueSuffix;
      return '<b>' + this.name + '</b> : ' + (this as any).y + (suffix || ''); // Affiche le nom et la valeur dans la légende
    }
  }
} as Highcharts.Options;
