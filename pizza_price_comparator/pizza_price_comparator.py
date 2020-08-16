from math import pi

if __name__ == "__main__":
	print("Add rectangular pizza with: rect width height price")
	print("Add round pizza with: circle diameter price")
	print("Type \"list\" to list pizza sizes ordered by score")
	print("Type \"exit\" to exit")
	
	answers = []
	
	while True:
		cmd = input("enter command: ").lower()
		
		words = cmd.split(" ")
		
		if len(words) == 0:
			print("wrong command")
		
		if words[0] == "rect" or words[0] == "rectangle":
			if len(words) != 4:
				print("wrong command")
			else:
				area = float(words[1].replace(",", ".")) * float(words[2].replace(",", "."))
				price = float(words[3].replace(",", "."))
				score = round(area/price, 2)
				answer = "area per price: {}".format(score)
				answers.append(("rectangle " + " ".join(words[1:]), score))
				print(answer)
		elif words[0] == "circle":
			if len(words) != 3:
				print("wrong command")
			else:
				area = pi * float(words[1].replace(",", "."))**2
				price = float(words[2].replace(",", "."))
				score = round(area/price, 2)
				answer = "area per price: {}".format(score)
				answers.append(("circle " + " ".join(words[1:]), score))
				print(answer)
		elif words[0] == "exit":
			exit()
		elif words[0] == "list":
			answers = sorted(answers, key = lambda x: x[1], reverse=True)
			for i, ans in enumerate(answers):
				print("{}. {} score: {}".format(i+1, ans[0], ans[1]))
		else:
			print("unknown command")
			