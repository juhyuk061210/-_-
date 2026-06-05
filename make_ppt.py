from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# Colors
BG_DARK = RGBColor(0x0B, 0x0F, 0x1A)
ACCENT = RGBColor(0xFF, 0xC8, 0x3D)  # gold
ACCENT2 = RGBColor(0x3D, 0x9D, 0xFF)  # blue
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GRAY = RGBColor(0xB8, 0xC0, 0xCC)
RED = RGBColor(0xFF, 0x4D, 0x4D)
GREEN = RGBColor(0x3D, 0xDC, 0x84)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

SW, SH = prs.slide_width, prs.slide_height
BLANK = prs.slide_layouts[6]

FONT = "Malgun Gothic"


def add_bg(slide, color=BG_DARK):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    bg.line.fill.background()
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    return bg


def add_text(slide, left, top, width, height, text, size=24, bold=False,
             color=WHITE, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, font=FONT):
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = Inches(0.05)
    tf.margin_right = Inches(0.05)
    tf.margin_top = Inches(0.05)
    tf.margin_bottom = Inches(0.05)

    lines = text.split("\n")
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        run = p.add_run()
        run.text = line
        run.font.name = font
        run.font.size = Pt(size)
        run.font.bold = bold
        run.font.color.rgb = color
    return tb


def add_chip(slide, left, top, text, color=ACCENT, text_color=BG_DARK, w=Inches(2.4), h=Inches(0.5)):
    chip = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, w, h)
    chip.adjustments[0] = 0.5
    chip.line.fill.background()
    chip.fill.solid()
    chip.fill.fore_color.rgb = color
    tf = chip.text_frame
    tf.margin_left = Inches(0.1)
    tf.margin_right = Inches(0.1)
    tf.margin_top = Inches(0.02)
    tf.margin_bottom = Inches(0.02)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = text
    r.font.name = FONT
    r.font.size = Pt(14)
    r.font.bold = True
    r.font.color.rgb = text_color
    return chip


def add_line(slide, x1, y1, x2, y2, color=ACCENT, weight=2.0):
    ln = slide.shapes.add_connector(1, x1, y1, x2, y2)
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    return ln


# =========================
# Slide 1 - Title / Hook
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)

# Accent vertical bar
bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(1.6), Inches(0.12), Inches(4.3))
bar.line.fill.background(); bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT

add_chip(s, Inches(1.0), Inches(1.0), "DAY 1  |  메타광고 마스터 클래스", w=Inches(4.5))

add_text(s, Inches(1.0), Inches(1.8), Inches(11), Inches(1.4),
         "4일 만에 일매출 500만원,", size=48, bold=True, color=WHITE)
add_text(s, Inches(1.0), Inches(2.8), Inches(11), Inches(1.4),
         "메타광고 전략의 전부", size=54, bold=True, color=ACCENT)

add_text(s, Inches(1.0), Inches(4.4), Inches(11), Inches(0.6),
         "강사   김고딩", size=22, bold=True, color=WHITE)
add_text(s, Inches(1.0), Inches(4.95), Inches(11), Inches(0.6),
         "고3 연매출 3억 · 수능 직후 월 순수익 4,500만원", size=18, color=GRAY)

add_text(s, Inches(1.0), Inches(6.7), Inches(11), Inches(0.5),
         "DAY 1 / 4  ·  되는 시장 vs 안되는 시장", size=14, color=GRAY)


# =========================
# Slide 2 - Why do we want money?
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_text(s, Inches(0.8), Inches(0.6), Inches(12), Inches(0.6),
         "여러분은 돈을 왜 벌고 싶으신가요?", size=36, bold=True, color=ACCENT)

reasons = [
    ("더 나은 삶", "내 삶의 격을 한 단계 위로"),
    ("부모님", "효도, 가족의 든든한 버팀목"),
    ("자녀", "내 아이에게 더 큰 세상을"),
    ("내 꿈", "하고 싶은 일을 마음껏"),
]

x0 = Inches(0.8); y0 = Inches(2.0); w = Inches(2.85); h = Inches(2.6); gap = Inches(0.15)
for i, (title, sub) in enumerate(reasons):
    left = x0 + (w + gap) * i
    card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y0, w, h)
    card.adjustments[0] = 0.08
    card.line.color.rgb = ACCENT
    card.line.width = Pt(1.2)
    card.fill.solid(); card.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)
    add_text(s, left, y0 + Inches(0.5), w, Inches(0.7), title, size=24, bold=True,
             color=ACCENT, align=PP_ALIGN.CENTER)
    add_text(s, left + Inches(0.2), y0 + Inches(1.4), w - Inches(0.4), Inches(1.0),
             sub, size=16, color=WHITE, align=PP_ALIGN.CENTER)

add_text(s, Inches(0.8), Inches(5.2), Inches(12), Inches(1.6),
         "우리는 모두 다른 목적을 가지고\n같은 목표를 향해 나아갑니다.",
         size=26, bold=True, color=WHITE, align=PP_ALIGN.CENTER)


# =========================
# Slide 3 - Speaker credibility
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "강사 이력 / 매출 실적", w=Inches(3.6))
add_text(s, Inches(0.8), Inches(1.3), Inches(12), Inches(0.8),
         "숫자로 증명하는 실전 경험", size=34, bold=True, color=WHITE)

stats = [
    ("3억", "고3 연매출"),
    ("2,000~2,500만", "월 평균 매출"),
    ("1,000만", "월 평균 순수익"),
    ("4,500만", "수능 직후 월 순수익"),
]
y = Inches(2.6); cw = Inches(2.85); ch = Inches(2.2); gap = Inches(0.15); x = Inches(0.8)
for i, (big, label) in enumerate(stats):
    left = x + (cw + gap) * i
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, cw, ch)
    box.adjustments[0] = 0.1
    box.line.color.rgb = ACCENT2; box.line.width = Pt(1.2)
    box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)
    add_text(s, left, y + Inches(0.35), cw, Inches(1.0), big, size=42, bold=True,
             color=ACCENT, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(1.35), cw, Inches(0.6), label, size=16,
             color=GRAY, align=PP_ALIGN.CENTER)

add_text(s, Inches(0.8), Inches(5.3), Inches(12), Inches(1.6),
         "그리고 메타광고로는,\n시작 4일 만에  ‘일매출 500만원’.",
         size=24, color=WHITE, align=PP_ALIGN.CENTER)


# =========================
# Slide 4 - 4 businesses tried
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_text(s, Inches(0.8), Inches(0.7), Inches(12), Inches(0.8),
         "제가 직접 해본 4가지 사업", size=34, bold=True, color=ACCENT)
add_text(s, Inches(0.8), Inches(1.55), Inches(12), Inches(0.5),
         "모두 월 매출 2,500만원 이상은 가뿐히 넘었습니다.", size=18, color=GRAY)

items = [
    ("01", "쿠팡 위탁판매", "최저가 경쟁 시스템"),
    ("02", "네이버 위탁판매", "광고비 100만 단위"),
    ("03", "틱톡 바이럴 마케팅", "노출 기반 트래픽"),
    ("04", "메타광고", "일매출 500 달성"),
]
y = Inches(2.4); cw = Inches(2.85); ch = Inches(3.2); gap = Inches(0.15); x = Inches(0.8)
for i, (num, name, sub) in enumerate(items):
    left = x + (cw + gap) * i
    highlight = (i == 3)
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, cw, ch)
    box.adjustments[0] = 0.08
    box.line.color.rgb = ACCENT if highlight else RGBColor(0x33, 0x3A, 0x4D)
    box.line.width = Pt(2.5 if highlight else 1.0)
    box.fill.solid()
    box.fill.fore_color.rgb = RGBColor(0x1B, 0x14, 0x05) if highlight else RGBColor(0x14, 0x1A, 0x2A)
    add_text(s, left, y + Inches(0.35), cw, Inches(0.8), num, size=36, bold=True,
             color=ACCENT if highlight else ACCENT2, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(1.4), cw, Inches(0.8), name, size=22, bold=True,
             color=WHITE, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(2.3), cw, Inches(0.6), sub, size=15,
             color=ACCENT if highlight else GRAY, align=PP_ALIGN.CENTER)

add_text(s, Inches(0.8), Inches(6.0), Inches(12), Inches(0.8),
         "그런데 다 해보고 깨달은 한 가지 — 되는 시장과 안 되는 시장은 분명히 있다.",
         size=18, bold=True, color=WHITE, align=PP_ALIGN.CENTER)


# =========================
# Slide 5 - Why NOT 네이버
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "안 되는 시장 ①   네이버", color=RED, text_color=WHITE, w=Inches(4.5))
add_text(s, Inches(0.8), Inches(1.4), Inches(12), Inches(0.8),
         "이미 ‘대기업’이 장악한 레드오션", size=32, bold=True, color=WHITE)

left_box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                              Inches(0.8), Inches(2.6), Inches(5.9), Inches(4.3))
left_box.adjustments[0] = 0.05
left_box.line.color.rgb = RED; left_box.line.width = Pt(1.2)
left_box.fill.solid(); left_box.fill.fore_color.rgb = RGBColor(0x1F, 0x10, 0x12)

add_text(s, Inches(1.1), Inches(2.8), Inches(5.4), Inches(0.6),
         "현실", size=20, bold=True, color=RED)
add_text(s, Inches(1.1), Inches(3.4), Inches(5.4), Inches(3.4),
         "상품 1개 띄우는 데 광고비 100만원\n\n"
         "이미 대기업이 키워드를 장악\n\n"
         "뚫으려면 ‘소규모 틈새’ 또는\n새 원료가 자주 나오는 건기식 시장\n\n"
         "그마저도 100만원 태우고 0개 판매 가능",
         size=18, color=WHITE)

right_box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                               Inches(7.0), Inches(2.6), Inches(5.5), Inches(4.3))
right_box.adjustments[0] = 0.05
right_box.line.color.rgb = ACCENT; right_box.line.width = Pt(1.2)
right_box.fill.solid(); right_box.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)
add_text(s, Inches(7.3), Inches(2.8), Inches(5.0), Inches(0.6),
         "한 줄 결론", size=20, bold=True, color=ACCENT)
add_text(s, Inches(7.3), Inches(3.5), Inches(5.0), Inches(3.2),
         "초보 셀러가 자본만 태우다\n끝나는 시장.",
         size=24, bold=True, color=WHITE)


# =========================
# Slide 6 - Why NOT 쿠팡
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "안 되는 시장 ②   쿠팡", color=RED, text_color=WHITE, w=Inches(4.5))
add_text(s, Inches(0.8), Inches(1.4), Inches(12), Inches(0.8),
         "소비자에게 편한 만큼, 판매자에게는 ‘피눈물’", size=30, bold=True, color=WHITE)

cards = [
    ("최저가 독점 구조", "한 상품에 여러 셀러가 붙어도\n최저가 1명만 판매 권한 획득"),
    ("브랜드 없으면 끝", "내 자체 제조 브랜드가 아니면\n돈 벌기 사실상 불가능"),
    ("판매정지 갑질", "송장번호 실수 1번 → 2주 정지\n그 사이 경쟁사가 다 점령"),
]
y = Inches(2.6); cw = Inches(3.95); ch = Inches(3.6); gap = Inches(0.2); x = Inches(0.8)
for i, (t, sub) in enumerate(cards):
    left = x + (cw + gap) * i
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, cw, ch)
    box.adjustments[0] = 0.07
    box.line.color.rgb = RED; box.line.width = Pt(1.5)
    box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x1F, 0x10, 0x12)
    add_text(s, left, y + Inches(0.4), cw, Inches(0.7), f"0{i+1}", size=30, bold=True,
             color=RED, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(1.2), cw, Inches(0.8), t, size=22, bold=True,
             color=WHITE, align=PP_ALIGN.CENTER)
    add_text(s, left + Inches(0.3), y + Inches(2.1), cw - Inches(0.6), Inches(1.4),
             sub, size=15, color=GRAY, align=PP_ALIGN.CENTER)

add_text(s, Inches(0.8), Inches(6.5), Inches(12), Inches(0.6),
         "쿠팡 · 네이버, 이제 초보 셀러가 살아남을 수 있는 환경이 아닙니다.",
         size=16, bold=True, color=ACCENT, align=PP_ALIGN.CENTER)


# =========================
# Slide 7 - Then, Meta?
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "되는 시장   메타광고", color=ACCENT, w=Inches(4.0))
add_text(s, Inches(0.8), Inches(1.4), Inches(12), Inches(1.0),
         "그럼 메타광고는 쉬울까요?", size=36, bold=True, color=WHITE)
add_text(s, Inches(0.8), Inches(2.3), Inches(12), Inches(1.0),
         "아니요. 어렵습니다. 그래서 ‘쉽게’ 풀어드릴 겁니다.",
         size=22, color=GRAY)

# Two-column comparison
y = Inches(3.6); colw = Inches(5.9); colh = Inches(3.4)
# Left - 의심
left = Inches(0.8)
box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, colw, colh)
box.adjustments[0] = 0.05
box.line.color.rgb = RGBColor(0x55, 0x5C, 0x70); box.line.width = Pt(1.0)
box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)
add_text(s, left + Inches(0.4), y + Inches(0.3), colw - Inches(0.8), Inches(0.6),
         "흔한 의심", size=18, bold=True, color=GRAY)
add_text(s, left + Inches(0.4), y + Inches(1.0), colw - Inches(0.8), Inches(2.4),
         "“인스타에서 물건 사본 적 없는데…”\n“광고가 그렇게 효율이 좋을까?”\n“나도 안 사봤는데 남이 살까?”",
         size=18, color=WHITE)

# Right - 결과
left = Inches(7.0)
box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, colw, colh)
box.adjustments[0] = 0.05
box.line.color.rgb = ACCENT; box.line.width = Pt(2.0)
box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x1B, 0x14, 0x05)
add_text(s, left + Inches(0.4), y + Inches(0.3), colw - Inches(0.8), Inches(0.6),
         "실제 결과", size=18, bold=True, color=ACCENT)
add_text(s, left + Inches(0.4), y + Inches(1.0), colw - Inches(0.8), Inches(2.4),
         "메타광고 시작   →   4일 만에\n\n     일매출  500만원",
         size=24, bold=True, color=WHITE)


# =========================
# Slide 8 - The Cycle
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_text(s, Inches(0.8), Inches(0.7), Inches(12), Inches(0.8),
         "메타광고 사이클  ·  단 4단계", size=34, bold=True, color=ACCENT)
add_text(s, Inches(0.8), Inches(1.5), Inches(12), Inches(0.5),
         "더 쉬운 길도, 더 효율적인 사업 방법도 없습니다. 그냥 이 사이클을 반복하세요.",
         size=16, color=GRAY)

steps = [
    ("01", "팔 제품 정하기", "무엇을 팔지 결정"),
    ("02", "소구점 찾기", "왜 사야 하는지"),
    ("03", "광고 소재 제작", "사고 싶게 보여주기"),
    ("04", "최적 광고 세팅", "돈이 새지 않게"),
]
y = Inches(2.8); cw = Inches(2.85); ch = Inches(3.2); gap = Inches(0.2); x = Inches(0.7)
for i, (num, t, sub) in enumerate(steps):
    left = x + (cw + gap) * i
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, cw, ch)
    box.adjustments[0] = 0.08
    box.line.color.rgb = ACCENT; box.line.width = Pt(1.5)
    box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)
    add_text(s, left, y + Inches(0.3), cw, Inches(0.8), num, size=36, bold=True,
             color=ACCENT, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(1.3), cw, Inches(0.8), t, size=22, bold=True,
             color=WHITE, align=PP_ALIGN.CENTER)
    add_text(s, left, y + Inches(2.3), cw, Inches(0.6), sub, size=15,
             color=GRAY, align=PP_ALIGN.CENTER)
    # arrow
    if i < 3:
        ax = left + cw + Inches(0.02)
        ay = y + ch / 2
        arr = s.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, ax, ay - Inches(0.18),
                                 Inches(0.16), Inches(0.36))
        arr.line.fill.background()
        arr.fill.solid(); arr.fill.fore_color.rgb = ACCENT

add_text(s, Inches(0.8), Inches(6.4), Inches(12), Inches(0.6),
         "Repeat  →  Repeat  →  Repeat", size=18, bold=True,
         color=ACCENT2, align=PP_ALIGN.CENTER)


# =========================
# Slide 9 - Proof / Testimonial
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "실전 증명", color=ACCENT, w=Inches(2.5))
add_text(s, Inches(0.8), Inches(1.3), Inches(12), Inches(1.0),
         "이 구조 그대로 → 결과가 나옵니다", size=32, bold=True, color=WHITE)

# Two big cards
cards = [
    ("강사 김고딩", "1주", "일매출 500만원"),
    ("수강생 고1", "10일", "일매출 200만원"),
]
y = Inches(2.8); cw = Inches(5.9); ch = Inches(3.6); gap = Inches(0.3); x = Inches(0.8)
for i, (who, days, result) in enumerate(cards):
    left = x + (cw + gap) * i
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, y, cw, ch)
    box.adjustments[0] = 0.06
    box.line.color.rgb = ACCENT; box.line.width = Pt(2.0)
    box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0x1B, 0x14, 0x05)
    add_text(s, left + Inches(0.4), y + Inches(0.3), cw - Inches(0.8), Inches(0.6),
             who, size=18, bold=True, color=ACCENT2)
    add_text(s, left + Inches(0.4), y + Inches(1.0), cw - Inches(0.8), Inches(1.0),
             days, size=60, bold=True, color=WHITE)
    add_text(s, left + Inches(0.4), y + Inches(2.4), cw - Inches(0.8), Inches(1.0),
             result, size=28, bold=True, color=ACCENT)

add_text(s, Inches(0.8), Inches(6.6), Inches(12), Inches(0.6),
         "재능이 아니라  ‘구조’ 의 차이입니다.",
         size=18, color=GRAY, align=PP_ALIGN.CENTER)


# =========================
# Slide 10 - Day 2 Preview
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)
add_chip(s, Inches(0.8), Inches(0.7), "DAY 2 예고", color=ACCENT2, text_color=WHITE, w=Inches(2.6))
add_text(s, Inches(0.8), Inches(1.4), Inches(12), Inches(1.0),
         "내일은,  ‘제품 소싱 기준’", size=38, bold=True, color=WHITE)
add_text(s, Inches(0.8), Inches(2.3), Inches(12), Inches(0.6),
         "어떤 제품을 팔아야 일매출 500이 나오는가.", size=22, color=ACCENT)

# Checklist
y = Inches(3.4)
points = [
    "되는 제품 vs 안 되는 제품 판별 기준",
    "메타광고에 최적화된 상품 카테고리",
    "초기 자본 없이도 시작 가능한 소싱 루트",
    "1주 안에 테스트 가능한 제품 선정법",
]
for i, p in enumerate(points):
    top = y + Inches(0.6 * i)
    dot = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(1.0), top + Inches(0.13),
                             Inches(0.18), Inches(0.18))
    dot.line.fill.background()
    dot.fill.solid(); dot.fill.fore_color.rgb = ACCENT
    add_text(s, Inches(1.4), top, Inches(11), Inches(0.5), p, size=20, color=WHITE)


# =========================
# Slide 11 - CTA
# =========================
s = prs.slides.add_slide(BLANK)
add_bg(s)

# Big CTA Card
card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                          Inches(1.0), Inches(0.8), Inches(11.3), Inches(5.9))
card.adjustments[0] = 0.04
card.line.color.rgb = ACCENT; card.line.width = Pt(2.5)
card.fill.solid(); card.fill.fore_color.rgb = RGBColor(0x14, 0x1A, 0x2A)

add_text(s, Inches(1.0), Inches(1.2), Inches(11.3), Inches(0.6),
         "정말 함께하고 싶은 분만", size=20, color=ACCENT, align=PP_ALIGN.CENTER)
add_text(s, Inches(1.0), Inches(1.9), Inches(11.3), Inches(1.4),
         "전화번호 + 이름을 남겨주세요", size=44, bold=True, color=WHITE,
         align=PP_ALIGN.CENTER)
add_text(s, Inches(1.0), Inches(3.3), Inches(11.3), Inches(0.6),
         "정보를 남기신 분께만  DAY 2 강의가 전송됩니다.",
         size=20, color=GRAY, align=PP_ALIGN.CENTER)

# Form fields (mock)
fy = Inches(4.3); fw = Inches(4.6); fh = Inches(0.8); fgap = Inches(0.3)
total_w = fw * 2 + fgap
fx = Inches(1.0) + (Inches(11.3) - total_w) / 2

for i, label in enumerate(["이름", "전화번호"]):
    left = fx + (fw + fgap) * i
    f = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, fy, fw, fh)
    f.adjustments[0] = 0.3
    f.line.color.rgb = ACCENT; f.line.width = Pt(1.2)
    f.fill.solid(); f.fill.fore_color.rgb = RGBColor(0x0B, 0x0F, 0x1A)
    add_text(s, left + Inches(0.3), fy, fw, fh, label, size=18,
             color=GRAY, anchor=MSO_ANCHOR.MIDDLE)

add_text(s, Inches(1.0), Inches(5.6), Inches(11.3), Inches(0.7),
         "일매출 500의 비밀은  ‘내일’ 부터 시작됩니다.",
         size=22, bold=True, color=ACCENT, align=PP_ALIGN.CENTER)

add_text(s, Inches(1.0), Inches(7.0), Inches(11.3), Inches(0.4),
         "보고 시도하지 않을 거라면, 이 강의는 받지 마세요.",
         size=13, color=GRAY, align=PP_ALIGN.CENTER)


out = "/home/user/-/김고딩_메타광고_DAY1.pptx"
prs.save(out)
print("Saved:", out, "  slides:", len(prs.slides.__iter__.__self__._sldIdLst))
