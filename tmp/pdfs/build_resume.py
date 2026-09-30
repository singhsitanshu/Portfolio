from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from pathlib import Path
for name,file in [('T','Times New Roman'),('TB','Times New Roman Bold'),('TI','Times New Roman Italic'),('TBI','Times New Roman Bold Italic')]:
 pdfmetrics.registerFont(TTFont(name,'/System/Library/Fonts/Supplemental/'+file+'.ttf'))
pdfmetrics.registerFontFamily('T',normal='T',bold='TB',italic='TI',boldItalic='TBI')
out='output/pdf/Aansh-Singh-Resume.pdf'
c=canvas.Canvas(out,pagesize=(612,792)); c.setTitle('Aansh Singh | Software Engineering Resume'); c.setAuthor('Aansh Singh')
L=21.6; R=590.4; W=R-L; y=755
style=ParagraphStyle('body',fontName='T',fontSize=12,leading=13.5)
def line(left,right='',font='TB'):
 global y
 c.setFont(font,12); c.drawString(L,y,left)
 if right:c.drawRightString(R,y,right)
 y-=13.5
def section(s):
 global y
 y-=6; c.setFont('TB',12); c.drawString(L,y,s); y-=4.5; c.setLineWidth(.65); c.line(L,y,R,y); y-=14

def bullet(s):
 global y
 p=Paragraph(s,style); _,h=p.wrap(W-9,800)
 c.setFont('T',9); c.drawString(L,y+1,'•'); p.drawOn(c,L+9,y+2.6-h+12); y-=h

def gap(n=5):
 global y
 y-=n

def project(title,tech):
 global y
 p=Paragraph('<b>'+title+'</b> | <i>'+tech+'</i>',style); _,h=p.wrap(W,800); p.drawOn(c,L,y+2.6-h+12); y-=h

c.setFont('TB',19); c.drawCentredString(306,y,'Aansh Singh'); y-=17
parts=[('512-221-8562',None),(' | ',None),('LinkedIn','https://www.linkedin.com/in/aansh-singh/'),(' | ',None),('GitHub','https://github.com/singhsitanshu'),(' | ',None),('singhsitanshu@ucla.edu','mailto:singhsitanshu@ucla.edu'),(' | Austin, TX',None)]
x=(612-sum(pdfmetrics.stringWidth(s,'T',12) for s,_ in parts))/2
c.setFont('T',12)
for s,url in parts:
 w=pdfmetrics.stringWidth(s,'T',12); c.drawString(x,y,s)
 if url:c.linkURL(url,(x,y-2,x+w,y+11),relative=0)
 x+=w
y-=13
section('EDUCATION')
line('University of California, Los Angeles | Henry Samueli School of Engineering','Los Angeles, CA')
line('Bachelor of Science in Computer Science','Expected Graduation: June 2029','TI')
section('EXPERIENCE')
line('Software Engineer','2025 - Present')
line('Bruin Underwater Robotics (BUR) @ UCLA','Los Angeles, CA','TI')
bullet('Developed Python/YOLOv11 object-detection models for autonomous RoboSub perception, recognizing navigation markers, gates, maps, and obstacles.')
bullet('Automated a Unity synthetic-data pipeline that generated 3,000+ labeled images with bounding boxes for underwater perception training.')
bullet('Exported PyTorch models to ONNX for TensorRT acceleration on NVIDIA Jetson; integrated Jetson and Raspberry Pi via ROS2 for onboard perception and real-time motor control.')
gap()
line('Software Engineering Team Lead Intern','May 2024 - Sept 2025')
line('D-Tech','Remote','TI')
bullet('Led 5 interns designing Flippper, an ePaper education platform; translated a German patent into software requirements, user flows, component interactions, and functional specifications.')
bullet('Defined workflows and hardware/software interfaces with the founder and an Oracle mentor; directed UI/UX prototypes and technical visualizations to evaluate feasibility and validate system design.')
gap()
line('Instructor','2024 - 2025')
line('CompuChild','Austin, TX','TI')
bullet('Taught Python and Scratch through hands-on coding and robotics projects; guided students in debugging code and resolving device issues.')
section('PROJECTS')
project('CodeGraph: Repository Intelligence','Python, TypeScript, React, FastAPI, Neo4j, LangGraph')
bullet('Built a full-stack application for exploring GitHub repositories through interactive file, function, and call graphs; implemented FastAPI services, React Flow visualization, and streamed ingestion progress.')
bullet('Parsed Python, JavaScript, TypeScript, Go, and Java with Tree-sitter using 32-way bounded processing and per-file fault isolation; built a LangGraph agent with 7 repository-scoped analysis tools.')
bullet('Combined Neo4j vector search with Leiden graph clustering to retrieve focused code context, reducing the measured LLM context from 737K to approximately 18K tokens (97.5%).')
bullet('Hardened ingestion with HMAC-SHA256 webhook verification and path-safe archive extraction; validated behavior with 82 Pytest cases, Node tests, and end-to-end Postman API workflows.')
gap()
project('TaskForge: Distributed Task Processing','Go, PostgreSQL, Redis, Docker, Prometheus')
bullet('Built a fault-tolerant task-processing platform with atomic PostgreSQL claims, priority scheduling, renewable leases, retries, and idempotent submission; added Prometheus metrics and Grafana dashboards.')
bullet('Tested concurrency and recovery using PostgreSQL integration tests, Go race detection, and controlled failure injection; validated 3,000 tasks / 6,000 attempts and 30 hard-killed attempts with no duplicate effects.')
bullet('Measured 15.84x scaling from 1 to 16 workers on 12,000 synthetic 50 ms tasks; separately persisted 30,000 API submissions at a median 2,143/sec with zero request or transport errors.')
section('TECHNICAL SKILLS')
for s in [
'<b>Languages:</b> Python, TypeScript, JavaScript, Go, Java, SQL, C++, C, HTML/CSS',
'<b>Web / Backend:</b> React, FastAPI, REST APIs, PostgreSQL, Neo4j, Redis, Docker, Git',
'<b>Testing / Observability:</b> Pytest, Postman, Node Tests, Prometheus, Grafana',
'<b>AI / Robotics:</b> LangGraph, RAG, PyTorch, YOLOv11, ONNX, TensorRT, ROS2, Unity']:
 p=Paragraph(s,style); _,h=p.wrap(W,800); p.drawOn(c,L,y+2.6-h+12); y-=h
print('bottom baseline',y)
assert y>20, y
c.save()
