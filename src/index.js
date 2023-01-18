import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { MultiSelect } from 'primereact/multiselect';

const DataTableReorderDemo = () => {
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const columns = [];
  const columnsFromLocalStorage = [];
  const [selectedColumns, setSelectedColumns] = useState(columns);

  const savedColumns = {
    0: { field: '企業名', header: 'Code' },
    1: { field: '役員', header: 'Quantity' },
    2: { field: '決算月', header: 'Category' },
    3: { field: '名称', header: 'Price' },
    4: { field: '評価', header: 'Quantity' },
    5: { field: '投資ステータス', header: 'InventoryStatus' },
    6: { field: '投資額', header: 'InventoryStatus' },
    7: { field: '持株数', header: 'Rating' },
  };

  for (var columnIndex in savedColumns) {
    columns.push(savedColumns[columnIndex]);
  }

  const columnsInLocalStorage = JSON.parse(
    localStorage.getItem('columnToggled')
  );
  for (var columnIndex in columnsFromLocalStorage) {
    columnsFromLocalStorage.push(columnsInLocalStorage[columnIndex]);
  }

  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsSmall().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 列の表示非表示機能
  const onColumnToggle = (event) => {
    let selectedColumns1 = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns1.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
    // ここでlocalStorageに列の表示非表示を保存
    localStorage.setItem(
      'columnToggled',
      JSON.stringify({
        selectedColumns1,
      })
    );
  };

  const usedColumns = (columnsFromLocalStorage[0] ||= selectedColumns);
  console.log('selectedColumns:', columnsFromLocalStorage[0]);
  // =====
  // 以下2つのconst...のうち、片方のみ使用する（もう片方はコメントアウトする）
  // （場合分けのコードを書くのを端折っているため）
  // =====
  // 初回時や列の表示非表示を操作していないときはこちら
  const dynamicColumns = usedColumns.map((col) => {
    // LocalStorageに保存している列を使うときはこちら
    // const dynamicColumns = columnsFromLocalStorage[0].map((col) => {
    if (col.field == '企業名') {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.field}
          columnKey={col.field}
          style={{ width: '280px', borderRight: 'groove 3px #b4b4b4' }}
          frozen
        />
      );
    } else {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.field}
          columnKey={col.field}
          style={{ width: '200px' }}
        />
      );
    }
  });

  return (
    <div>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <Toast ref={toast}></Toast>
      <div className="card">
        <div class="fixed">
          <MultiSelect
            value={usedColumns}
            options={columns}
            optionLabel="field"
            onChange={onColumnToggle}
            style={{ width: '3em', borderRadius: '20px' }}
            dropdownIcon="pi pi-sliders-h"
          />
        </div>
        <DataTable
          value={products}
          reorderableColumns
          // 以下2行 rowGroupMode, groupRowsBy がセル結合に関するprops
          // デモ https://www.primefaces.org/primereact/datatable/rowgroup/
          rowGroupMode="rowspan"
          groupRowsBy={['企業名', '役員', '決算月', '評価']}
          // 上2行と下のscrollableは現状共存できない
          // scrollable
          scrollHeight="500px"
          scrollDirection="both"
          //
          stateStorage="local"
          stateKey="table-mock"
          selectionMode="single"
          responsiveLayout="scroll"
        >
          {dynamicColumns}
        </DataTable>
      </div>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
      <p>///</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<DataTableReorderDemo />, rootElement);
