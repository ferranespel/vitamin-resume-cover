import { Page, Text, View, Document } from "@react-pdf/renderer";
import { spacing } from "components/Resume/ResumePDF/styles";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { CoverLetter } from "lib/redux/types";

export const CoverLetterPDF = ({
  coverLetter,
  settings,
  isPDF = false,
}: {
  coverLetter: CoverLetter;
  settings: any;
  isPDF?: boolean;
}) => {
  const { personalDetails, employerDetails, content } = coverLetter;
  const themeColor = settings?.themeColor || "#38bdf8";
  const fontSize = settings?.fontSize || "11";

  // 👇 NUEVO: Calcular tamaños con límites
  const baseFontSize = parseInt(fontSize);
  const nameFontSize = Math.min(baseFontSize + 4, 16); // Max 16px
  const jobTitleFontSize = Math.min(baseFontSize + 1, 12); // Max 12px

  // Dividir el contenido en párrafos
  const paragraphs = content.coverText
    .split("\n\n")
    .filter((p) => p.trim() !== "");

// Usar componentes HTML cuando no es PDF
  if (!isPDF) {
    return (
      <div style={{ 
        width: "8.5in", 
        minHeight: "11in", 
        padding: "40px",
        paddingLeft: "50px", // 👈 Espacio para la barra
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        position: "relative"
      }}>
        {/* Barra de color vertical - pegada al margen izquierdo */}
        <div style={{
          position: "absolute",
          left: "0",
          top: "0",
          bottom: "0",
          width: "12px",
          backgroundColor: themeColor
        }} />

        {/* Grid Container - toda la altura */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 180px",
          gap: "30px",
          minHeight: "calc(11in - 80px)"
        }}>
          {/* Main Content Column */}
          <div>
            {/* Header - SIN barra horizontal */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{ 
                fontSize: `${nameFontSize}px`,
                fontWeight: "700", 
                marginBottom: "8px",
                color: "#1f2937",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                lineHeight: "1.2"
              }}>
                {personalDetails.name || "YOUR NAME"}
              </div>
              <div style={{ 
                fontSize: `${jobTitleFontSize}px`,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "500"
              }}>
                {personalDetails.jobTitle || "Job Title"}
              </div>
            </div>
            {/* To: Company */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: `${fontSize}pt`, fontWeight: "600" }}>
                To: {employerDetails.companyName || "Company Name"}
              </p>
            </div>

            {/* Greeting */}
            {employerDetails.hiringManagerName && (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: `${fontSize}pt` }}>
                  {employerDetails.hiringManagerName ? 
                    `Dear ${employerDetails.hiringManagerName},` : 
                    "To whom it may concern,"}
                </p>
              </div>
            )}

            {/* Letter Content */}
            <div>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p 
                    key={index}
                    style={{ 
                      fontSize: `${baseFontSize}px`,
                      lineHeight: "1.5",
                      marginBottom: "16px",
                      textAlign: "justify",
                      color: "#1f2937",
                      overflowWrap: "break-word"
                    }}
                  >
                    {paragraph.trim()}
                  </p>
                ))
              ) : (
                <p style={{ 
                  fontSize: `${baseFontSize}px`,
                  color: "#9ca3af",
                  fontStyle: "italic"
                }}>
                  Your cover letter content will appear here...
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Column - ocupa toda la altura */}
          <div style={{ 
            borderLeft: "1px solid #e5e7eb",
            paddingLeft: "20px",
            paddingTop: "20px"
          }}>
            {/* Address */}
            {personalDetails.address && (
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ 
                  fontSize: "10px", 
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: themeColor,
                  marginBottom: "8px"
                }}>
                  ADDRESS
                </h3>
                <p style={{ 
                  fontSize: "10px", 
                  lineHeight: "1.5",
                  color: "#4b5563"
                }}>
                  {personalDetails.address}
                </p>
              </div>
            )}

            {/* Email */}
            {personalDetails.email && (
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ 
                  fontSize: "10px", 
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: themeColor,
                  marginBottom: "8px"
                }}>
                  EMAIL
                </h3>
                <p style={{ 
                  fontSize: "10px",
                  color: "#4b5563",
                  wordBreak: "break-word"
                }}>
                  {personalDetails.email}
                </p>
              </div>
            )}

            {/* Phone */}
            {personalDetails.phone && (
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ 
                  fontSize: "10px", 
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: themeColor,
                  marginBottom: "8px"
                }}>
                  PHONE
                </h3>
                <p style={{ 
                  fontSize: "10px",
                  color: "#4b5563"
                }}>
                  {personalDetails.phone}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

// Para PDF rendering
  return (
    <Document>
      <Page size="LETTER" style={{ 
        fontFamily: "Helvetica",
        fontSize: fontSize + "pt",
        color: DEFAULT_FONT_COLOR,
        position: "relative"
      }}>
        {/* Barra de color vertical - pegada al margen izquierdo */}
        <View style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "12pt",
          backgroundColor: themeColor
        }} />

        {/* Container con padding para el contenido */}
        <View style={{
          padding: spacing["10"],
          paddingLeft: spacing["12"],
          display: "flex",
          flexDirection: "row"
        }}>
          {/* Main Content Column */}
          <View style={{ flex: 3, paddingRight: spacing["8"] }}>
            {/* Header */}
            <View style={{ marginBottom: spacing["8"] }}>
              <Text style={{ 
                fontSize: nameFontSize + "pt",
                fontWeight: "bold",
                marginBottom: spacing["1"],
                textTransform: "uppercase",
                letterSpacing: "0.5pt"
              }}>
                {personalDetails.name || "YOUR NAME"}
              </Text>
              <Text style={{ 
                fontSize: jobTitleFontSize + "pt",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "1pt"
              }}>
                {personalDetails.jobTitle || "Job Title"}
              </Text>
            </View>

            {/* To: Company */}
            <View style={{ marginBottom: spacing["4"] }}>
              <Text style={{ fontWeight: "bold" }}>
                To: {employerDetails.companyName || "Company Name"}
              </Text>
            </View>

            {/* Greeting */}
            {employerDetails.hiringManagerName && (
              <View style={{ marginBottom: spacing["4"] }}>
                <Text>
                  {employerDetails.hiringManagerName ? 
                    `Dear ${employerDetails.hiringManagerName},` : 
                    "To whom it may concern,"}
                </Text>
              </View>
            )}

            {/* Letter Content */}
            <View>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <Text 
                    key={index}
                    style={{ 
                      fontSize: baseFontSize + "pt",
                      lineHeight: 1.5,  // 👈 Reducido
                      marginBottom: "9pt",
                      textAlign: "justify",  // 👈 Justify
                    }}
                  >
                    {paragraph.trim()}
                  </Text>
                ))
              ) : (
                <Text style={{ 
                  fontSize: baseFontSize + "pt",
                  color: "#999", 
                  fontStyle: "italic" 
                }}>
                  Your cover letter content will appear here...
                </Text>
              )}
            </View>
          </View>

          {/* Sidebar Column - altura completa */}
          <View style={{ 
            flex: 1,
            borderLeftWidth: "1pt",
            borderLeftColor: "#e5e7eb",
            paddingLeft: spacing["4"],
            paddingTop: spacing["4"]
          }}>
            {/* Address */}
            {personalDetails.address && (
              <View style={{ marginBottom: spacing["6"] }}>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  color: themeColor,
                  marginBottom: spacing["1"]
                }}>
                  ADDRESS
                </Text>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  lineHeight: 1.5,
                  color: "#4b5563"
                }}>
                  {personalDetails.address}
                </Text>
              </View>
            )}

            {/* Email */}
            {personalDetails.email && (
              <View style={{ marginBottom: spacing["6"] }}>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  color: themeColor,
                  marginBottom: spacing["1"]
                }}>
                  EMAIL
                </Text>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  color: "#4b5563"
                }}>
                  {personalDetails.email}
                </Text>
              </View>
            )}

            {/* Phone */}
            {personalDetails.phone && (
              <View style={{ marginBottom: spacing["6"] }}>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  color: themeColor,
                  marginBottom: spacing["1"]
                }}>
                  PHONE
                </Text>
                <Text style={{ 
                  fontSize: fontSize - 2 + "pt",
                  color: "#4b5563"
                }}>
                  {personalDetails.phone}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};