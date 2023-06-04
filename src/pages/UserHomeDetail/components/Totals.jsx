import React, { useEffect, useState } from 'react';
import { getToken, initAxiosInterceptor, formatPrice } from '../../../AxiosHelper';
import axios from 'axios';

const Totals = ({ percentages }) => {

  return (
    <>
      <div className="chart_div section">
        <h3>Total último mes</h3>
        <p>${percentages ? formatPrice(percentages.sumLastMonth) : 'No data'}</p>
      </div>
      <div className="chart_div section">
        <h3>Total mes actual</h3>
        <p>${percentages ? formatPrice(percentages.sumCurrentMonth) : 'No data'}</p>
      </div>
      <div className="chart_div section">
        <h3>Diferencia</h3>
        <p>${percentages ? formatPrice(percentages.difference) : 'No data'}</p>
        <div className="percentage">
          <p>{percentages ? percentages.percentage : ''}%</p>
        </div>
      </div>
    </>
  );
};

export default Totals;
