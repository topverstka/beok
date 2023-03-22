let rectHover = document.createElement('div');
let tooltipChart = document.createElement('div');
rectHover.classList.add('ct-chart-hover');
tooltipChart.classList.add('tooltip-hover');

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('ct-point')) {
        let positionToolTop = window.innerWidth > 768 ? 85 : 65;
        let positionLeft = e.target.getAttribute('x1');
        let positionTop = e.target.getAttribute('y1');
        let positionValue = e.target.getAttribute('ct:value');
        let tooltipChartTarget = e.target.closest('svg').parentElement.querySelector('.tooltip-hover');
        let targetValue = e.target.closest('[data-value]') ? e.target.closest('[data-value]').getAttribute('data-value') : false;
        !e.target.closest('svg').parentElement.querySelector('.ct-chart-hover') && !e.target.closest('.line-chart__area') ? e.target.closest('svg').parentElement.append(rectHover) : e.target.closest('svg').parentElement.querySelector('.ct-chart-hover').style.display = 'block';
        e.target.closest('svg').parentElement.querySelector('.ct-chart-hover').style.left = (positionLeft - 15) + 'px';
        tooltipChartTarget.style.top = (positionTop - positionToolTop) + 'px';
        tooltipChartTarget.innerText = 'в среднем\n' + positionValue + (targetValue ? ' ' + targetValue : '');
        tooltipChartTarget.classList.add('_active');
        tooltipChartTarget.style.left = (positionLeft - (tooltipChartTarget.scrollWidth / 2)) + 'px';


        let countDate = e.target;

        e.target.closest('svg').querySelectorAll('.ct-end[data-count]').forEach(i => i.style = null);

        [...countDate.parentElement.querySelectorAll('line')].find((i, index) => {
            if (i === countDate) {
                e.target.closest('svg').querySelectorAll('.ct-end[data-count]')[index].style.color = "#ED6A53";
            }
        });

        if (e.target.closest('svg').querySelector('text[data-count]')) {
            countDate = e.target.previousSibling.dataset.count;
            e.target.closest('svg').querySelectorAll('text[data-count]').forEach(i => i.style = null);
            let elementHover = e.target.closest('svg').querySelectorAll('text[data-count]')[countDate];
            elementHover.style.fill = "#ED6A53";
        }

    }


    if (e.target.classList.contains('ct-end')) {
        let countDate = e.target.dataset.count;
        e.target.closest('svg').querySelectorAll('.ct-point').forEach(i => i.style = null);
        let elementHover = e.target.closest('svg').querySelectorAll('.ct-point')[countDate];
        elementHover.dispatchEvent(new Event('click', {
            'bubbles': true
        }));
        elementHover.style.opacity = 1;
        // let positionLeft = e.target.getAttribute('x1');
        // let positionTop = e.target.getAttribute('y1');
        // let positionValue = e.target.getAttribute('ct:value');
        // tooltipChartTarget.style.top = (positionTop - 55) + 'px';
        // tooltipChartTarget.innerText = positionValue + (targetValue ? ' ' + targetValue : '');
        // tooltipChartTarget.classList.add('_active');
        // tooltipChartTarget.style.left = (positionLeft - 25) + 'px';
    }
});

document.addEventListener('mouseout', function(e) {
    if (!e.target.classList.contains('ct-point') && e.target.closest('svg') && !e.target.closest('.line-chart__area')) {
        e.target.closest('svg').parentElement.querySelector('.ct-chart-hover') ? e.target.closest('svg').parentElement.querySelector('.ct-chart-hover').style.display = 'none' : '';
        e.target.closest('svg').parentElement.querySelector('.tooltip-hover').classList.remove('_active');
        findAll('.ct-point').forEach(i => i.style = null);
        findAll('[data-count]').forEach(i => i.style = null);
    }
});



function updateCharts(chartsElements) {
	if (window.innerWidth > 768) return;

	chartsElements.forEach(chart => {
		if (chart.__chartist__) {
			const dotsCount = chart.__chartist__.data.labels.length;
			const singleLabelWidth = chart.parentElement.getBoundingClientRect().width / 3;//60;
			// alert(singleLabelWidth);
			const chartWidth = singleLabelWidth * dotsCount;
			chart.style.minWidth = `${chartWidth}px`;
			setTimeout(() => {
				chart.__chartist__.update();
			}, 10)
		}
	})
}
document.addEventListener('DOMContentLoaded', () => {
    function CreateChart(node, isNumberPoints) {
        node.closest('.section-chart').querySelectorAll('.ct-end').forEach((i, index, arr) => {
            let res = Number(i.parentElement.getAttribute('x')) - (i.scrollWidth / 2);
            i.parentElement.setAttribute('x', res);
            if (window.innerWidth < 768 && arr.length === index + 1) {
                i.parentElement.setAttribute('width', 60);
                i.parentElement.setAttribute('x', i.parentElement.getAttribute('x') - 10);
            }
        });

        let widthContainer = node.closest('.chart-tabs-section').scrollWidth;


        if (window.innerWidth < 768) {
            widthContainer = node.closest('.section-chart').scrollWidth;
        }

        node.closest('.section-chart').querySelectorAll('.ct-grids .ct-grid').forEach(i => {
            i.setAttribute('x1', 30)
            i.setAttribute('x2', widthContainer)
        });

        node.closest('.section-chart').insertAdjacentHTML('afterbegin', '<div class="tooltip-hover"></div>');

        !node.closest('.ct-chart__container').querySelector('.ct-start-text__chart') ? node.closest('.ct-chart__container').insertAdjacentHTML('afterbegin', '<div class="ct-start-text__chart"></div>') : '';


        if (!node.closest('.ct-chart__container').querySelector('.ct-start-text__chart .ct-start-text__element')) {
            node.closest('.section-chart').querySelectorAll('.ct-start').forEach((i, index) => {
                node.closest('.ct-chart__container').querySelector('.ct-start-text__chart').insertAdjacentHTML('afterbegin', `
        <div class="ct-start-text__element"
            style="
                top: ${i.parentElement.getAttribute('y')}px;
                left: ${i.parentElement.getAttribute('x')}px;
                width: ${i.parentElement.getAttribute('width')}px;
                height: ${i.parentElement.getAttribute('height')}px;
            "
        >${i.innerText}</div>
        `);
            });
        }

        rectHover.style.height = (node.scrollHeight - 50) + 'px';

        node.closest('.section-chart').querySelectorAll('.ct-end').forEach((i, index) => {
            i.setAttribute('data-count', index);
        });

        if (isNumberPoints) {
            node.closest('.section-chart').querySelectorAll('.ct-point').forEach((i, index) => {
                i.insertAdjacentHTML('beforebegin', `<text data-count="${index}" x="${Number(i.getAttribute('x1')) - 4}" y="${Number(i.getAttribute('y1')) - 20}">${index + 1}</text>`);
            });
        }
    }

    new Chartist.Bar('.ct-chart-bar--weeks', {
        labels: ['2 - 10 июл', '2 - 10 июл', '2 - 10 июл', '2 - 10 июл', '2 - 10 июл', '2 - 10 июл', '2 - 10 июл', '2 - 10 июл'],

        series: [
            [10000, 20000, 100000, 40000, 10000, 100000, 40000, 10000],
        ]
    }, {
        stackBars: true,
        axisY: {
            labelInterpolationFnc: function(value) {
                if (value !== 0) {
                    return (value / 1000) + 'К';
                } else {
                    return value;
                }
            }
        },
        axisX: {
            showGrid: false,
        },
        plugins: [autoWidth()]
    }).on('draw', function(data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 30px;stroke: #ED6A53'
            });
        }
    }).on('created', function(e) {
        e.svg._node.closest('.section-chart').querySelectorAll('.ct-bar').forEach((i, index) => {
            i.insertAdjacentHTML('beforebegin', `<text x="${Number(i.getAttribute('x1')) - 4}" y="${Number(i.getAttribute('y2')) - 15}">${index + 1}</text>`);
        });
        e.svg._node.closest('.section-chart').querySelectorAll('.ct-end').forEach((i, index) => {
            i.setAttribute('data-count', index);
        });


        !e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart') ? e.svg._node.closest('.ct-chart__container').insertAdjacentHTML('afterbegin', '<div class="ct-start-text__chart"></div>') : '';


        if (!e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart .ct-start-text__element')) {
            e.svg._node.closest('.section-chart').querySelectorAll('.ct-start').forEach((i, index) => {
                e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart').insertAdjacentHTML('afterbegin', `
        <div class="ct-start-text__element"
            style="
                top: ${i.parentElement.getAttribute('y')}px;
                left: ${i.parentElement.getAttribute('x')}px;
                width: ${i.parentElement.getAttribute('width')}px;
                height: ${i.parentElement.getAttribute('height')}px;
            "
        >${i.innerText}</div>
        `);
            });
        }
    });

    new Chartist.Bar('.ct-chart-bar--day', {
        labels: ['10 июл', '10 июл', '10 июл', '10 июл', '10 июл', '10 июл', '10 июл', '10 июл'],

        series: [
            [7000, 2000, 10000, 4000, 1000, 10000, 4000, 1000],
        ]
    }, {
        stackBars: true,
        axisX: {
            showGrid: false,
        },
        plugins: [autoWidth()]
    }).on('created', function(e) {
        !e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart') ? e.svg._node.closest('.ct-chart__container').insertAdjacentHTML('afterbegin', '<div class="ct-start-text__chart"></div>') : '';


        if (!e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart .ct-start-text__element')) {
            e.svg._node.closest('.section-chart').querySelectorAll('.ct-start').forEach((i, index) => {
                e.svg._node.closest('.ct-chart__container').querySelector('.ct-start-text__chart').insertAdjacentHTML('afterbegin', `
        <div class="ct-start-text__element"
            style="
                top: ${i.parentElement.getAttribute('y')}px;
                left: ${i.parentElement.getAttribute('x')}px;
                width: ${i.parentElement.getAttribute('width')}px;
                height: ${i.parentElement.getAttribute('height')}px;
            "
        >${i.innerText}</div>
        `);
            });
        }


    }).on('draw', function(data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: window.innerWidth > 768 ? 'stroke-width: 30px;stroke: #ED6A53' : 'stroke-width: 24px;stroke: #ED6A53'
            });
        }

    })


    new Chartist.Line('.ct-chart-4', {
        labels: ['20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля', '20 июля'],
        series: [
            [40, 30, 40, 50, 60, 80, 60, 30, 40, 30, 40, 50, 60, 80, 60, 30, 40, 30, 40, 50, 60, 80, 60, 30]
        ]
    }, {
        low: 0,
        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        divisor: true,
        //showArea: true,
        showGrid: false,
        fullWidth: true,
        chartPadding: {
            left: 50
        },
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        },
        plugins: [autoWidth(80)]
    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {
        CreateChart(e.svg._node);
    });

    new Chartist.Line('.ct-chart-4__all-course', {
        // labels: ['8-14 июл', '15-21 июл', '22-28 июл', '29-4 июл, авг', '5-12 июл', '13-20 июл', '21-28 июл', '29-4 июл, авг'],
        labels: ['08.06.23\n14.06.23', '15.06.23\n21.06.23', '22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23','22.06.23\n28.06.23',          '22.06.23\n28.06.23', '29.07.23\n04.08.23', '5-12 июл', '13-20 июл', '21-28 июл', '29-4 июл, авг'],
        series: [
            [40, 30, 40, 50, 60, 80, 60, 30, 10, 20, 30, 40, 50, 60, 70, 80, 90, 80]
        ]
    }, {
        low: 0,
        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        divisor: true,
        //showArea: true,
        showGrid: false,
        fullWidth: true,
        chartPadding: {
            left: 50
        },
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        },
        plugins: [autoWidth(80)]
    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {

        CreateChart(e.svg._node, true);

    });

    new Chartist.Line('.ct-chart-4__month', {
        labels: [
            '28-14 июн', '22-28 июл', '5-12 июл', '21-28 июл'
        ],
        series: [
            [35, 100, 60, 140]
        ]
    }, {
        low: 0,
        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        divisor: true,
        ticks: [1, 10, 20, 30],
        //showArea: true,
        showGrid: false,
        fullWidth: true,
        chartPadding: {
            left: 50
        },
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        },
        plugins: [autoWidth(80)]
    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {
        CreateChart(e.svg._node);

    });


    new Chartist.Line('.ct-chart-3', {
        labels: ['2-20 июля', '2-20 июля', '2-20 июля', '2-20 июля', '2-20 июля', '2-20 июля', '2-20 июля', '2-20 июля'],
        series: [
            [60, 50, 40, 50, 30, 80, 40, 20]
        ]
    }, {
        low: 0,
        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        showGrid: false,
        fullWidth: true,
        lineSmooth: false,
        chartPadding: {
            left: 50
        },
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        }

    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {
        CreateChart(e.svg._node, true);
    });



    new Chartist.Line('.ct-chart-2__weeks', {
        labels: ['1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн','1 июл, пн',          '1 июл, пн', '2 июл, вт', '3 июл, ср', '4 июл, чт', '5 июл, пт', '6 июл, сб', '7 июл, вс'],
        series: [
            [60, 50, 40, 50, 30, 80, 40, 10, 20, 30, 40, 50, 60, 70, 80, 90, 80]
        ]
    }, {
        low: 0,
        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        // divisor: true,
        //  ticks: [1, 10, 20, 30],
        //showArea: true,
        showGrid: false,
        lineSmooth: false,
        fullWidth: true,
        chartPadding: {
            //right: 10,
            left: 50
        },
        //  referenceValue: 5,
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        }

    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {
        CreateChart(e.svg._node);
    });

    new Chartist.Line('.ct-chart-2', {
        labels: [
            '28-14 июн', '22-28 июл', '5-12 июл', '21-28 июл'
        ],
        series: [
            [35, 100, 60, 140]
        ]
    }, {
        low: 0,
        // high: 150,

        lineSmooth: Chartist.Interpolation.monotoneCubic({
            fillHoles: false
        }),
        divisor: true,
        lineSmooth: false,
        fullWidth: true,
        chartPadding: {
            //right: 10,
            left: 50
        },
        //  referenceValue: 5,
        axisX: {
            showGrid: false,
            scaleMinSpace: 20,
        },
        axisY: {
            scaleMinSpace: 32,
            // offset: 45,
            onlyInteger: true,
            labelOffset: {
                x: -60,
                y: 0
            },
        }

    }, [
        ['screen and (max-width: 500px)', {
            chartPadding: {
                left: 15
            },
            axisY: {
                labelOffset: {
                    x: -20
                },
            }
        }]
    ]).on('created', function(e) {

        CreateChart(e.svg._node)

    }).on('draw', function(data) {
        if (data.type === 'line') {

            let lengthPoint = data.path.pos;
            let divider = 6;

            for (let i = 0; i < lengthPoint - 1; i++) {
                let numbX = -((data.path.pathElements[i].x - data.path.pathElements[i + 1].x) / 7);
                let numbY = -((data.path.pathElements[i].y - data.path.pathElements[i + 1].y) / 7);

                // let numbX = -((data.path.pathElements[i].x - data.path.pathElements[i + 1].x) / divider) - (3 / 2);
                // let numbY = -((data.path.pathElements[i].y - data.path.pathElements[i + 1].y) / 7);


                let variabNumbX = data.path.pathElements[i].x;
                let variabNumbY = data.path.pathElements[i].y;
                for (let j = 0; j < divider; j++) {
                    variabNumbX += numbX;
                    variabNumbY += numbY;
                    data.group.append(new Chartist.Svg('line', {
                        x1: (variabNumbX),
                        y1: (variabNumbY),
                        x2: (variabNumbX),
                        y2: (variabNumbY)
                    }, 'ct-point__double'));

                }

            }
        }
    });
    new Chartist.Line('.ct-chart-up', {
        labels: [90, 40, 50, 40, 50, 60, 70, 80],
        series: [
            [40, 30, 40, 50, 60, 80, 60, 90]
        ]
    }, {
        low: 0,
        showArea: true,
        showGrid: false,
        // width: '1500',
        fullWidth: true,
        chartPadding: {
            right: 5,
            left: -35
        },

        axisX: {
            showGrid: false,
            showLabel: false,

        },
        axisY: {
            showGrid: false,
            showLabel: false,

        }

    }).on('created', function(e) {
        !e.svg._node.closest('.section-chart').querySelector('.tooltip-ct') ? e.svg._node.closest('.section-chart').insertAdjacentHTML('afterbegin', `<div class="tooltip-ct"></div>`) : '';
        let pointPosition = find('.ct-point');
        //console.log(pointPosition);
        e.svg._node.closest('.section-chart').querySelector('.tooltip-ct').style.cssText = `
        left: ${Number(pointPosition.getAttribute('x1')) - 28}px;
        top: ${Number(pointPosition.getAttribute('y1')) - 50}px;
    `;
        e.svg._node.closest('.section-chart').querySelector('.tooltip-ct').innerText = pointPosition.getAttribute('ct:value') + ' кг';
        // find('.ct-chart-2').appendChild(tooltipChart);
    });
    new Chartist.Line('.ct-chart', {
        labels: [90, 40, 50, 40, 50, 60, 70, 80],
        series: [
            [40, 30, 40, 50, 60, 80, 60, 90]
        ]
    }, {
        low: 0,
        showArea: true,
        showGrid: false,
        // width: '1500',
        fullWidth: true,
        chartPadding: {
            right: 5,
            left: -35
        },

        axisX: {
            showGrid: false,
            showLabel: false,

        },
        axisY: {
            showGrid: false,
            showLabel: false,

        }

    }).on('created', function(e) {
        !e.svg._node.closest('.section-chart').querySelector('.tooltip-ct') ? e.svg._node.closest('.section-chart').insertAdjacentHTML('afterbegin', `<div class="tooltip-ct"></div>`) : '';
        let pointPosition = find('.ct-point');
        //console.log(pointPosition);
        e.svg._node.closest('.section-chart').querySelector('.tooltip-ct').style.cssText = `
        left: ${Number(pointPosition.getAttribute('x1')) - 28}px;
        top: ${Number(pointPosition.getAttribute('y1')) - 50}px;
    `;
        e.svg._node.closest('.section-chart').querySelector('.tooltip-ct').innerText = pointPosition.getAttribute('ct:value') + ' кг';
        // find('.ct-chart-2').appendChild(tooltipChart);
    });


		updateCharts(document.querySelectorAll('.section-chart'));
		window.addEventListener('resize', () => {
			setTimeout(() => {
				updateCharts(document.querySelectorAll('.section-chart'));
			}, 100)
		})
});

function autoWidth(width = 40, media = '(max-width: 992px)') {
    const mql = window.matchMedia(media);

    return function (char) {
        const length = char.data.series[0].length;

        handleChange();
        mql.addEventListener("change", handleChange);

        function handleChange() {
            if (mql.matches) {
                char.container.style.width = length * width + 'px';
            } else {
                char.container.style.width = null;
            }
        }
    };
}
