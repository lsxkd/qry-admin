import service from '@/utils/request';

// 每日盈亏报表
export function dailyReportList(data) {
  const dataObj = {
    params: data
  };
  return service.get('/mg-back/report/dailyReport', dataObj);
}

// 关键数据指标
export function dailyKpiList() {
  return service.get('/mg-back/report/kpi');
}

// 每日盈亏报表
export function dailyReportDayList(data) {
  const dataObj = {
    params: data
  };
  return service.get('/mg-back/report/makeDailyReport', dataObj);
}

