function TickBoxEditPwd()
{
	if($("#oldpwd").val()=="")
	{
		alert("请填写旧的密码");
		$("#oldpwd").focus();
		return false;
	}
	if($("#newpwd").val()=="")
	{
		alert("请填写新的密码");
		$("#newpwd").focus();
		return false;
	}
	if($("#newpwd").val() != $("#newpwd2").val())
	{
		alert("两次密码不相同，请重新输入");
		$("#newpwd").focus();
		return false;
	}
}