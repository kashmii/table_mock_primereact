import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';

const DataTableReorderDemo = () => {
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const columns = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
  ];

  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsSmall().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onColReorder = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Column Reordered',
      life: 3000,
    });
  };

  const onRowReorder = (e) => {
    setProducts(e.value);
    toast.current.show({
      severity: 'success',
      summary: 'Rows Reordered',
      life: 3000,
    });
  };

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
      />
    );
  });

  return (
    <div>
      <Toast ref={toast}></Toast>

      <div className="card">
        <DataTable
          value={products}
          reorderableColumns
          reorderableRows
          onRowReorder={onRowReorder}
          onColReorder={onColReorder}
          responsiveLayout="scroll"
        >
          <Column rowReorder style={{ width: '3em' }} />
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<DataTableReorderDemo />, rootElement);
