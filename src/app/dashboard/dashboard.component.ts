import {Component} from '@angular/core';
import {
  Chart,
  BarElement,
  LinearScale,
  CategoryScale,
  BarController,
  PieController,
  ArcElement,
  Tooltip
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
  invoicesData: any;

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
    let numberInvoices = 0;
    this.http.get(INVOICES_TOTAL_AMOUNT_API).subscribe({
      next: (data) => {
        this.invoicesTotalAmount = data;
        let splitted = this.invoicesTotalAmount.toString().split(",");
        numberInvoices = splitted[0];
        let totalAmountPerMonth = splitted[1];
        let month = splitted[2];

        this.barChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let dataValues = new Array(12).fill(null);
        let monthIndex = parseInt(month) - 1;
        dataValues[monthIndex] = totalAmountPerMonth;

        this.barChart.data.datasets = [
          {
            label: "Total Amount",
            data: dataValues,
            backgroundColor: DARK_BLUE
          }
        ];
        this.barChart.update();
      },
      error: (err) => {
        console.log(err);
      }
    });

    Chart.register(BarController);
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(BarElement);
    Chart.register(Tooltip)

    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: "Month"
            }
          },
          y: {
            title: {
              display: true,
              text: "Total Amount"
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                const numberOfInvoices = value !== null ? numberInvoices : 'N/A';
                return `Number of Invoices: ${numberOfInvoices}`;
              }
            }
          }
        },
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
        for (const element of this.invoicesGroupedByVendor) {
          let splitted = element.split(",");
          let vendorEmail = splitted[0];
          let numberInvoicesPerVendor = splitted[1];

          labels.push(vendorEmail);
          dataValues.push(numberInvoicesPerVendor);
          backgroundColors.push(LIME);
          backgroundColors.push(LIGHT_BLUE);
          backgroundColors.push(DARK_BLUE);
          backgroundColors.push(GREY);
        }
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
    Chart.register(ArcElement);
    Chart.register(Tooltip);

    this.pieChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
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
                const value = context.formattedValue || '';
                return `${value}`;
              }
            }
          }
        }
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

        for (const element of this.invoicesGroupedByVendorTotalAmount) {
          let splitted = element.split(",");
          let vendorEmail = splitted[0];
          let numberInvoicesPerVendor = splitted[1];
          let totalAmountPerVendor = splitted[2];

          labels.push(vendorEmail);
          dataValues.push(totalAmountPerVendor);

          backgroundColors.push(DARK_BLUE);
          backgroundColors.push(LIGHT_BLUE);
          backgroundColors.push(GREY);
          backgroundColors.push(LIME);
        }
        this.doughnutChart.data.labels = labels;
        this.doughnutChart.data.datasets = [
          {
            label: 'Doughnut Chart Dataset',
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

    Chart.register(Tooltip);

    this.doughnutChart = new Chart("doughnutChart", {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: 'Doughnut Chart Dataset',
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
                const value = context.formattedValue || '';
                return `${value}`;
              }
            }
          }
        }
      }
    });
  }

  switchMonth(month: any): string {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return '';
    }
  }
}
