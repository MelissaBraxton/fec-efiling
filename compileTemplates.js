fs = require('fs');

function read(path, tmpl) {
  return eval('`' + fs.readFileSync(path, 'utf-8') + '`') || "";
}

function compile() {
  var breadcrumbsHome = read('templates/breadcrumbs-home.tmpl.html');
  var committeeForm = read('templates/committee-form.tmpl.html');
  var rightPane = 'test content';
  var header = read('templates/splash-header.tmpl.html');
  var landing = read('templates/landing.tmpl.html');
  var existingReport = read('templates/existing-report.tmpl.html');
  var reportHeader = read('templates/report-header.tmpl.html')
  var chooseTransactionType = read('templates/transaction-type.tmpl.html')
  var breadCrumbsExistingReport = read('templates/breadcrumbs-existing-report.tmpl.html')
  var chooseReceiptEntryType = read('templates/entry-type.tmpl.html', {manualEntryLink: '/html/enter-receipt.html'})
  var chooseDisbursementEntryType = read('templates/entry-type.tmpl.html', {manualEntryLink: '/html/enter-disbursement.html'})
  var receiptContacts = read('templates/receipt-contact-types.tmpl.html')
  var disbursementContacts = read('templates/disbursement-contact-types.tmpl.html')
  var enterReceipt = read('templates/enter-transaction.tmpl.html', {contactTypes: receiptContacts,
                                                                            transactionType: "Contributions"})
  var enterDisbursement = read('templates/enter-transaction.tmpl.html', {contactTypes: disbursementContacts,
                                                                            transactionType: "Disbursements"})
  var readyToSubmitPane = read('templates/ready-to-submit.tmpl.html')
  var table = read('templates/table.tmpl.html')

  var index = read('templates/master.tmpl.html', {breadcrumbs: breadcrumbsHome,
                                                    leftPane: landing,
                                                    rightPane: "",
                                                    header: header});

  var selectExistingReport = read('templates/master.tmpl.html', {breadcrumbs: breadcrumbsHome,
                                                            leftPane: landing,
                                                            rightPane: existingReport,
                                                            header: header});

  var selectTransactionType = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: chooseTransactionType,
                                                            rightPane: "",
                                                            header: reportHeader});

  var selectReceiptEntryType = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: chooseReceiptEntryType,
                                                            rightPane: "",
                                                            header: reportHeader});

  var selectDisbursementEntryType = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: chooseDisbursementEntryType,
                                                            rightPane: "",
                                                            header: reportHeader});

  var enterReceipt = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: enterReceipt,
                                                            rightPane: table,
                                                            header: reportHeader});

  var enterDisbursement = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: enterDisbursement,
                                                            rightPane: table,
                                                            header: reportHeader});

  var readyToSubmit = read('templates/master.tmpl.html', {breadcrumbs: breadCrumbsExistingReport,
                                                            leftPane: readyToSubmitPane,
                                                            rightPane: table,
                                                            header: reportHeader});




  fs.writeFileSync('index.html', index);
  console.log('written: index.html');

  fs.writeFileSync('html/select-existing-report.html', selectExistingReport);
  console.log('written: html/select-existing-report.html');

  fs.writeFileSync('html/select-transaction-type.html', selectTransactionType);
  console.log('written: html/select-transaction-type.html');

  fs.writeFileSync('html/select-receipt-entry-type.html', selectReceiptEntryType);
  console.log('written: html/select-receipt-entry-type.html');

  fs.writeFileSync('html/select-disbursement-entry-type.html', selectDisbursementEntryType);
  console.log('written: html/select-disbursement-entry-type.html');

  fs.writeFileSync('html/enter-receipt.html', enterReceipt);
  console.log('written: html/enter-receipt.html');

  fs.writeFileSync('html/enter-disbursement.html', enterDisbursement);
  console.log('written: html/enter-disbursement.html');

  fs.writeFileSync('html/ready-to-submit.html', readyToSubmit);
  console.log('written: html/ready-to-submit.html');
}

fs.watch('templates', {recursive: true}, compile)

compile()
