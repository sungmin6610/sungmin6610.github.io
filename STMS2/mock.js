// Mock API for STMS2 client-side demo

let mockInventory = [
    {순번: 1, 신품번: '803A030', 구품번: '', 품명: 'Stud BOLT', 재고수량: 100, 공정진행: 50, 입고수량: 200},
    {순번: 2, 신품번: 'MA000082', 구품번: '', 품명: 'COOLING BLOCK', 재고수량: 40, 공정진행: 10, 입고수량: 50},
    {순번: 3, 신품번: 'MA000083', 구품번: '', 품명: 'COOLING BLOCK RIGHT', 재고수량: 30, 공정진행: 5, 입고수량: 40},
    {순번: 4, 신품번: 'MA000093', 구품번: '', 품명: 'COOLING BLOCK LEFT', 재고수량: 15, 공정진행: 0, 입고수량: 20},
    {순번: 5, 신품번: 'MA000094', 구품번: '', 품명: 'COOLING BLOCK RIGHT HD550', 재고수량: 25, 공정진행: 2, 입고수량: 30}
];

const mockSalesKpi = {
    status: 'success',
    kpis: {
        today: {value: 1250000, growth: 5.2},
        week: {value: 8500000, growth: -2.1},
        month: {value: 35000000, growth: 12.4},
        year: {value: 420000000, growth: 8.5}
    }
};

const mockTopItems = {
    status: 'success',
    items: [
        {name: 'Stud BOLT', revenue: 15000000},
        {name: 'COOLING BLOCK', revenue: 12000000},
        {name: 'COOLING BLOCK RIGHT', revenue: 8000000},
        {name: 'COOLING BLOCK LEFT', revenue: 5000000},
        {name: 'COOLING BLOCK RIGHT HD550', revenue: 2000000}
    ]
};

const mockRecentSales = {
    status: 'success',
    sales: [
        {날짜: '2023-10-25', 품명: 'Stud BOLT', 매출액: 450000},
        {날짜: '2023-10-25', 품명: 'COOLING BLOCK', 매출액: 320000},
        {날짜: '2023-10-24', 품명: 'COOLING BLOCK RIGHT', 매출액: 150000},
        {날짜: '2023-10-23', 품명: 'Stud BOLT', 매출액: 80000},
        {날짜: '2023-10-22', 품명: 'COOLING BLOCK LEFT', 매출액: 210000}
    ]
};

const originalFetch = window.fetch;

window.fetch = async function() {
    const url = arguments[0];
    const options = arguments[1] || {};

    // Helper to return mock response
    const jsonResponse = (data) => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
    });

    if (typeof url === 'string') {
        if (url.includes('/api/inventory')) {
            return jsonResponse({
                status: 'success',
                data: mockInventory
            });
        }
        if (url.includes('/api/sales/kpi')) {
            return jsonResponse(mockSalesKpi);
        }
        if (url.includes('/api/sales/top-items')) {
            return jsonResponse(mockTopItems);
        }
        if (url.includes('/api/sales/recent')) {
            return jsonResponse(mockRecentSales);
        }
        if (url.includes('/api/upload')) {
            // Simulate successful upload
            return jsonResponse({
                status: 'success',
                message: '테스트 환경이므로 파일 업로드가 가상으로 성공 처리되었습니다.'
            });
        }
        if (url.includes('/api/edit')) {
            return jsonResponse({
                status: 'success',
                message: '테스트 환경이므로 수정 내용이 가상으로 반영되었습니다.'
            });
        }
        // Add trend mock
        if (url.includes('/api/sales/trend')) {
            return jsonResponse({
                status: 'success',
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
                datasets: [{
                    label: '월별 매출',
                    data: [1200, 1900, 3000, 5000, 2000, 3000, 4500]
                }]
            });
        }
    }

    // Fallback to original fetch
    return originalFetch.apply(this, arguments);
};
