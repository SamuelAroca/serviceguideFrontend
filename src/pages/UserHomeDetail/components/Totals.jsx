import React, { useEffect, useState } from 'react';
import { getToken, initAxiosInterceptor, formatPrice } from '../../../AxiosHelper';
import axios from 'axios';

const Totals = ({ percentages }) => {

  return (
    <>
      <div className="chart_div section">
        <h3>Total mes anterior</h3>
        <p>${percentages ? formatPrice(percentages.lastSumMonth) : 'No data'}</p>
      </div>
      <div className="chart_div section">
        <h3>Total mes actual</h3>
        <p>${percentages ? formatPrice(percentages.sumMonth) : 'No data'}</p>
      </div>
      <div className="chart_div section">
        <h3>Diferencia</h3>
        <p>${percentages ? formatPrice(percentages.difference) : 'No data'}</p>
      </div>
    </>
  );
};

export default Totals;
