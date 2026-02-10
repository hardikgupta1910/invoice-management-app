import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  invoiceId: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
  },

  statusBox: {
    textAlign: "right",
  },
  status: {
    fontSize: 11,
    marginBottom: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },

  /* ADDRESSES */
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  addressBlock: {
    width: "45%",
  },
  label: {
    fontSize: 10,
    color: "#777",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  value: {
    marginBottom: 3,
  },

  /* TABLE */
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    paddingBottom: 6,
    marginBottom: 6,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottom: "0.5 solid #eee",
  },
  colItem: { width: "40%" },
  colQty: { width: "20%", textAlign: "right" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },

  /* TOTALS */
  totals: {
    marginTop: 20,
    alignSelf: "flex-end",
    width: "45%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    borderTop: "1 solid #000",
    paddingTop: 8,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#777",
  },
});

const InvoicePDF = ({ invoice }) => {
  const subtotal = invoice.items.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceId}>#{invoice.id}</Text>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.status}>Status: {invoice.status}</Text>
            <Text>Invoice Date: {invoice.invoiceDate}</Text>
            <Text>Due Date: {invoice.dueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ADDRESSES */}
        <View style={styles.addressRow}>
          <View style={styles.addressBlock}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{invoice.billFrom.streetAddress}</Text>
            <Text style={styles.value}>{invoice.billFrom.city}</Text>
            <Text style={styles.value}>{invoice.billFrom.postCode}</Text>
            <Text style={styles.value}>{invoice.billFrom.country}</Text>
          </View>

          <View style={styles.addressBlock}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.value}>{invoice.clientName}</Text>
            <Text style={styles.value}>{invoice.billTo.streetAddress}</Text>
            <Text style={styles.value}>{invoice.billTo.city}</Text>
            <Text style={styles.value}>{invoice.billTo.postCode}</Text>
            <Text style={styles.value}>{invoice.billTo.country}</Text>
          </View>
        </View>

        {/* TABLE */}
        <View style={styles.tableHeader}>
          <Text style={styles.colItem}>Item</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Price</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {invoice.items.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.colItem}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>
              ₹{Number(item.price).toFixed(2)}
            </Text>
            <Text style={styles.colTotal}>
              ₹{Number(item.total).toFixed(2)}
            </Text>
          </View>
        ))}

        {/* TOTALS */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>-{invoice.discount || 0}%</Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text>Total</Text>
            <Text>₹{Number(invoice.amount).toFixed(2)}</Text>
          </View>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Thank you for your business • Generated by Invoice Generator
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
