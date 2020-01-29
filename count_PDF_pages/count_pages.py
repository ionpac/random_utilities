#!/usr/bin/env python3

from PyPDF2 import PdfFileReader
import os
from sys import argv
import re

if len(argv) < 2:
	print("Usage: python {} [directory or pdf file] [optional regex filenames have to match]".format(argv[0]))
	exit()

path = argv[1].strip('"') # trailing backslashes can escape the " character
print("root path: {}".format(path))

rx = None
if len(argv) >= 3:
	rx = argv[2]
	print("Matching regex: {}".format(rx))


def get_pdf_files(path):
	result = []
	for root, dirs, files in os.walk(path):
		for f in files:
			if f.lower().endswith(".pdf"):
				if rx == None or re.search(rx, f) != None:
					result.append((os.path.join(root, f), f))
	return result

files = [(path, path),] if os.path.isfile(path) and path.lower().endswith(".pdf") else get_pdf_files(path)

print(files)

failed = False

total_pages = 0
for file in files:
	
	try:
		reader = PdfFileReader(open(file[0], 'rb'))
		pages = reader.getNumPages()
		print("{} {} pages".format(file[1], pages))
		total_pages += pages
	except KeyboardInterrupt:
		exit()
	except:
		print("{} failed".format(file[1]))
		failed = True

print("".join([ "=" for a in range(60)]))

print("SUM{}: {}".format(" approx." if failed else "", total_pages))

if(failed):
	print("some files could not be counted")
