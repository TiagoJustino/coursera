TARGET=ideation-report
FIGS=

%.pdf: %.tex
	pdflatex -interaction=nonstopmode $<
	pdflatex -interaction=nonstopmode $<
#	bibtex $*
#	pdflatex -interaction=nonstopmode $<
#	pdflatex -interaction=nonstopmode $<

%.pdf: %.dot
	dot -Tpdf < $< > $@
	mv $@ bak.$@
	pdfcrop bak.$@ $@

%.png: %.dot
	dot -Tpng < $< > $@

all: $(TARGET).pdf

$(TARGET).pdf: $(FIGS) $(TARGET).tex

figs: $(FIGS)

preview: $(TARGET).pdf
	evince $(TARGET).pdf

clean: cleantex

cleantex:
	rm -f $(TARGET).toc $(TARGET).bbl $(TARGET).blg $(TARGET).log $(TARGET).out *.aux

monitor: $(TARGET).pdf
	evince $(TARGET).pdf &
	while inotifywait -e close_write $(TARGET).tex; do make; done
