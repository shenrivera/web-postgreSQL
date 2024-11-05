import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font  } from '@react-pdf/renderer';
import fondoImage from "../assets/fondo_1.jpg";
import lado from "../assets/imagenlado.png";
import footer from "../assets/footerr.png";
import RobotoThinFont from '../assets/fonts/Roboto-Regular.ttf';

// Registra la fuente Roboto-Thin
Font.register({ family: 'Roboto-Regular', src: RobotoThinFont });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    color: "black",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 50,
  },
  imageContainer: {
    marginRight: 11,
    left: 80,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  imagemargen: {
    width: 40,
    height: 800,
    marginTop: 750,
    marginRight: 10,
    right: 180,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    right: 60,
    textAlign: "center",
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    color: "black",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 10,
  },
  footerImage: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },

  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginBottom: 10,
    marginTop:20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'justify', // Establece el justificado del texto
  },
});

const Header = () => (
  <View style={styles.header}>
    <View style={styles.imageContainer}>
      <Image src={fondoImage} style={styles.image} />
    </View>
    <View style={styles.imageContainer}>
      <Image src={lado} style={styles.imagemargen} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ ...styles.headerText, fontSize: 12, marginLeft: 45 }}>
        CABILDO INDÍGENA DEL RESGUARDO DE HONDURAS
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 11 }}>
        Autoridad Tradicional
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 11 }}>
        Ley 89 de 1890 Art.246-230C.P.C 1991
      </Text>
      <Text style={{ ...styles.headerText, fontSize: 9 }}>
        Nit. 817.002251-5
      </Text>
      <View style={styles.lineContainer}>
        <View
          style={{
            ...styles.line,
            width: "85%",
            marginLeft: 45,
            marginRight: "auto",
            marginTop: 5,
            borderBottomColor: "green",
            borderBottomWidth: 1,
            right: 60,
          }}
        />
      </View>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.imageContainer}></View>
    <View
      style={{
        ...styles.line,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 3,
        borderBottomColor: "red",
        borderBottomWidth: 1,
      }}
    />
    <Image src={footer} style={styles.footerImage} />
    <Text
      style={{
        ...styles.header,
        margin: 4,
        left: 80,
        textAlign: "center",
        fontSize: 12,
      }}
    >
      Morales, Calle 3 No. 1 – 41. E-mail: cabildodehonduras@hotmail.com
    </Text>
  </View>
);

const PdfDetalles = () => {
  const loremIpsum = `......aqui esdonde ira tu contenido.......`;

  // Función para dividir el contenido en páginas
  const splitContentIntoPages = (content) => {
    const pages = [];
    const words = content.split(' ');
    let currentPage = '';

    words.forEach((word) => {
      if (currentPage.length + word.length <= 2000) { // Ajusta el número de caracteres por página según sea necesario
        currentPage += `${word} `;
      } else {
        pages.push(currentPage.trim());
        currentPage = `${word} `;
      }
    });

    // Agregar la última página
    if (currentPage.length > 0) {
      pages.push(currentPage.trim());
    }

    return pages;
  };

  const contentPages = splitContentIntoPages(loremIpsum);

  return (
    <Document>
      {contentPages.map((pageContent, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Header />
          
          <View>
          <View
          style={{
            ...styles.section,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          <Text>MUNICIPIO DE MORALES CAUCA</Text>
        </View>
        <View
          style={{
            ...styles.section,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            marginTop: 15,
            fontSize: 14,
          }}
        >
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
            LOS SUSCRITOS MIEMBROS DE LA AUTORIDAD TRADICIONAL DEL{" "}
          </Text>
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
            RESGUARDO INDÍGENA DE HONDURAS, EN USO DE SUS FACULTADES{" "}
          </Text>
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
            LEGALES Y CONSTITUCIONALES QUE LE CONFIERE LA LEY 89 DE{" "}
          </Text>
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
            1890, Y LOS ARTÍCULOS 246 -330 DE LA CONSTITUCIÓN NACIONAL DE{" "}
          </Text>
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>1991 </Text>
        </View>
        
        <Text style={styles.text}>{pageContent}</Text>
          </View>
          <Footer />
        </Page>
      ))}
    </Document>
  );
};

export default PdfDetalles;