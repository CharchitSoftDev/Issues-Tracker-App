function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].issueAssigned;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '</div>';
        if (severity == 'High') {
            document.getElementsByClassName('well')[i].style.backgroundColor = 'red';
        }
        if (severity == 'Medium') {
            document.getElementsByClassName('well')[i].style.backgroundColor = 'yellow';
        }
        if (severity == 'Low') {
            document.getElementsByClassName('well')[i].style.backgroundColor = '#e4eaa3';
        }

    }
}
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(0, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();

}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function saveIssue(e) {
    var guid = guids();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';

    const issue = {
        id: guid + guids(),
        description: issueDesc,
        severity: issueSeverity,
        issueAssigned: issueAssignedTo,
        status: issueStatus
    }
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    fetchIssues();
    e.preventDefault();

}

function guids() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(25).substring(1);
}