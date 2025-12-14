from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

def crear_pdf_sanciones():
    filename = "Sanciones_Datos_RGPD_Penal.pdf"
    doc = SimpleDocTemplate(filename, pagesize=A4,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=72)
    
    story = []
    styles = getSampleStyleSheet()

    # --- Estilos ---
    estilo_titulo = ParagraphStyle('Titulo', parent=styles['Title'], fontSize=18, spaceAfter=20, textColor=colors.darkblue)
    estilo_h1 = ParagraphStyle('H1', parent=styles['Heading2'], fontSize=14, spaceBefore=15, spaceAfter=10, textColor=colors.black, backColor=colors.whitesmoke, borderPadding=5)
    estilo_h2 = ParagraphStyle('H2', parent=styles['Heading3'], fontSize=12, spaceBefore=10, textColor=colors.darkblue)
    estilo_normal = ParagraphStyle('Normal', parent=styles['Normal'], fontSize=11, leading=14, alignment=TA_JUSTIFY, spaceAfter=8)
    estilo_lista = ParagraphStyle('Lista', parent=styles['Normal'], fontSize=11, leading=14, leftIndent=20, spaceAfter=4)
    
    # Estilo Caso Práctico
    estilo_caso = ParagraphStyle('Caso', parent=styles['Normal'], fontSize=11, leading=14, backColor=colors.lightyellow, borderPadding=10, spaceAfter=10)

    # --- Contenido ---

    # Título
    story.append(Paragraph("Sanciones por Acceso No Autorizado a Datos Personales", estilo_titulo))
    story.append(Paragraph("<b>Marco Legal:</b> RGPD, LOPDGDD y Responsabilidad Penal.", estilo_normal))
    story.append(Spacer(1, 10))

    # Sección I
    story.append(Paragraph("I. Leyes que Regulan la Infracción", estilo_h1))
    story.append(Paragraph("El acceso no autorizado a servidores con datos personales se regula por:", estilo_normal))
    
    story.append(Paragraph("1. RGPD y LOPDGDD", estilo_h2))
    story.append(Paragraph("El acceso no autorizado viola la seguridad de los datos e infringe el principio de <b>integridad y confidencialidad</b> (Art. 5.1.f RGPD).", estilo_normal))
    story.append(Paragraph("2. Responsabilidad Penal", estilo_h2))
    story.append(Paragraph("El acceso ilícito a sistemas (hacking/intrusión) y la revelación de secretos son delitos tipificados que pueden conllevar penas de prisión.", estilo_normal))
    story.append(Paragraph("3. Deber de Confidencialidad", estilo_h2))
    story.append(Paragraph("El personal (actual o pasado) tiene deber de secreto. Romperlo es una infracción muy grave.", estilo_normal))

    # Sección II (Tabla)
    story.append(Paragraph("II. Sanciones y Castigos (Multas Administrativas)", estilo_h1))
    
    data = [
        ["Tipo de Infracción", "Prescripción", "Cuantía Máxima (Multa)"],
        [Paragraph("<b>Muy Graves</b><br/>(Vulneración de principios, deber de confidencialidad)", styles['Normal']), 
         "3 años", 
         Paragraph("<b>20 Millones €</b> o <b>4%</b> facturación anual.", styles['Normal'])],
        [Paragraph("<b>Graves</b><br/>(Falta de medidas de seguridad, no notificar brechas)", styles['Normal']), 
         "2 años", 
         Paragraph("<b>10 Millones €</b> o <b>2%</b> facturación anual.", styles['Normal'])],
        ["Leves", "1 año", "Cuantía variable."]
    ]

    t = Table(data, colWidths=[180, 80, 180])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.darkblue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 5))
    story.append(Paragraph("Nota: Además de multas a la empresa, el empleado enfrenta responsabilidad penal (cárcel) y civil (indemnizaciones).", estilo_normal))

    # Sección III - Caso Práctico
    story.append(Paragraph("III. Caso Práctico Realista: 'El Caso Diana'", estilo_h1))
    
    texto_caso = """<b>Hechos:</b> Diana, exempleada de soporte en 'TechCorp', usa una credencial antigua no revocada para entrar al servidor y robar datos de 15.000 clientes con fines lucrativos.<br/><br/>
    <b>Consecuencias Legales:</b><br/>
    • <b>Diana (Culpable):</b> Enfrenta proceso penal (posible <b>cárcel</b> por revelación de secretos e intrusión informática) y civil (pagar <b>indemnización</b> millonaria por daños).<br/>
    • <b>TechCorp (Empresa):</b> Enfrenta multa de la AEPD (hasta 4% facturación) por <b>falta de seguridad</b> (no revocar accesos a tiempo)."""
    
    story.append(Paragraph(texto_caso, estilo_caso))

    # Generar
    doc.build(story)
    print(f"PDF generado exitosamente: {filename}")

if __name__ == "__main__":
    crear_pdf_sanciones()