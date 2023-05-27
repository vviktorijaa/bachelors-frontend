import {Component} from '@angular/core';
import {
  Chart,
  BarElement,
  LinearScale,
  CategoryScale,
  BarController,
  PieController,
  ArcElement,
  DoughnutController
} from "chart.js";
import {HttpClient} from "@angular/common/http";

const INVOICES_TOTAL_AMOUNT_API = "http://localhost:8081/totalAmountPerMonth";
const INVOICES_GROUPED_BY_VENDOR_API = "http://localhost:8081/groupedByVendor";
const INVOICES_GROUPED_BY_VENDOR_TOTAL_AMOUNT_API = "http://localhost:8081/groupedByVendorTotalAmountPerMonth";

const DARK_BLUE = "#152A5F";
const LIGHT_BLUE = "#6c83a1"
const GREY = "#5f6165"
const LIME = "#5C946E"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  activeTab: string = 'home';

  public barChart: any;
  public pieChart: any;
  public doughnutChart: any;

  invoicesTotalAmount: any;
  invoicesGroupedByVendor: any;
  invoicesGroupedByVendorTotalAmount: any;

  constructor(private http: HttpClient) {
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  ngOnInit(): void {
    this.getBarChart();
    this.getPieChart();
    this.getDoughnutChart();
  }

  getBarChart() {
    this.http.get(INVOICES_TOTAL_AMOUNT_API).subscribe({
      next: (data) => {
        this.invoicesTotalAmount = data;
        let splitted = this.invoicesTotalAmount.toString().split(",");
        let numberInvoices = splitted[0];
        let totalAmountPerMonth = splitted[1];
        let month = splitted[2];

        this.barChart.data.labels = ["Total Amount per month"];
        this.barChart.data.datasets = [
          {
            label: "Month",
            data: [month],
            backgroundColor: 'blue'
          },
          {
            label: "Total Amount",
            data: [totalAmountPerMonth],
            backgroundColor: DARK_BLUE
          }
        ];
        this.barChart.update();
      },
      error: (err) => {
        console.log(err)
      }
    })

    Chart.register(BarController);
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(BarElement);

    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  getPieChart() {
    this.http.get(INVOICES_GROUPED_BY_VENDOR_API).subscribe({
      next: (data) => {
        this.invoicesGroupedByVendor = data;
        const labels = [];
        const dataValues = [];
        const backgroundColors = [];
        for (let i = 0; i < this.invoicesGroupedByVendor.length; i++) {
          let splitted = this.invoicesGroupedByVendor[i].split(",");
          let vendorEmail = splitted[0];
          let numberInvoicesPerVendor = splitted[1];

          labels.push(vendorEmail);
          dataValues.push(numberInvoicesPerVendor);
          backgroundColors.push(LIME);
          backgroundColors.push(LIGHT_BLUE);
          backgroundColors.push(DARK_BLUE);
          backgroundColors.push(GREY);
        }
        ;
        this.pieChart.data.labels = labels;
        this.pieChart.data.datasets[0].data = dataValues;
        this.pieChart.data.datasets[0].backgroundColor = backgroundColors;
        this.pieChart.update();
      },
      error: (err) => {
        console.log(err)
      }
    })

    Chart.register(PieController);
    Chart.register(ArcElement)

    this.pieChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Pie',
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  getDoughnutChart() {
    this.http.get(INVOICES_GROUPED_BY_VENDOR_TOTAL_AMOUNT_API).subscribe({
      next: (data) => {
        this.invoicesGroupedByVendorTotalAmount = data;
        const labels = [];
        const dataValues = [];
        const backgroundColors = [];

        for (let i = 0; i < this.invoicesGroupedByVendorTotalAmount.length; i++) {
          let splitted = this.invoicesGroupedByVendorTotalAmount[i].split(",");
          let vendorEmail = splitted[0];
          let numberInvoicesPerVendor = splitted[1];
          let totalAmountPerVendor = splitted[2];

          labels.push(vendorEmail);
          dataValues.push(numberInvoicesPerVendor);
          backgroundColors.push(DARK_BLUE);
          backgroundColors.push(LIGHT_BLUE);
          backgroundColors.push(GREY);
          backgroundColors.push(LIME);
        }
        this.doughnutChart.data.labels = labels;
        this.doughnutChart.data.datasets = [
          {
              label: 'Doughnut Chart',
            data: dataValues,
            backgroundColor: backgroundColors,
            hoverOffset: 4
          }
        ];
        this.doughnutChart.update();
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.doughnutChart = new Chart("doughnutChart", {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: 'My First Dataset',
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.formattedValue || '';
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }
}
