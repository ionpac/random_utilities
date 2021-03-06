#!/usr/bin/env python3

from PyPDF2 import PdfFileReader
import os
from sys import argv
import sys
import re

if len(argv) < 2:
	print("Usage: python {} [directory or pdf file] [optional regex filenames have to match]".format(argv[0]))
	exit()

path = argv[1].strip('"') # trailing backslashes can escape the " character
print("Counting in directory: {}".format(path))

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

failed = False

total_pages = 0
for file in files:
	
	try:
		sys.stdout = open(os.devnull, "w")
		sys.stderr = open(os.devnull, "w")
		reader = PdfFileReader(open(file[0], 'rb'))		
		pages = reader.getNumPages()
		sys.stdout = sys.__stdout__
		sys.stderr = sys.__stderr__
		print("{} {} pages".format(file[1], pages))
		total_pages += pages
	except KeyboardInterrupt:
		exit()
	except Exception as ex:
		print("{}     FAILED".format(file[1]))
		failed = True

print("".join([ "=" for a in range(60)]))

print("SUM: {}{}".format("at least " if failed else "", total_pages))

if(failed):
	print("some files could not be counted (for no good reason)")
