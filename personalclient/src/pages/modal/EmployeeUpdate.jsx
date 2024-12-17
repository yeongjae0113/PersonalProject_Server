import React, { useEffect, useState } from 'react';
import styles from '../../css/modal/EmployeeCreate.module.css';
import axios from 'axios';

const EmployeeUpdate = ({
        isOpen,
        onClose,
        userId,
        setUserId,
        password,
        setPassword,
        username,
        setUsername,
        gender,
        setGender,
        age,
        setAge,
        phoneNumber,
        setPhoneNumber,
        department,
        setDepartment,
        position,
        role,
        setRole,
        setPosition,
        selectedUser,
        
    }) => {
        const [departments, setDepartments] = useState([]);   // 부서 리스트 상태
        
        useEffect(() => {
            if (isOpen) {
                const fetchDepartments = async () => {
                    try {
                        const response = await axios.get('http://localhost:8088/department/list');
                        setDepartments(response.data);  // departments 상태 업데이트
                    } catch (error) {
                        console.error('DB에서 부서를 가져오지 못함: ', error);
                        setDepartments([]);     // 에러 발생 시 빈 배열로
                    }
                };
                fetchDepartments();
            }

            if (selectedUser) {
                setUserId(selectedUser.userId)
                setPassword(selectedUser.password)
                setUsername(selectedUser.username)
                setGender(selectedUser.gender)
                setAge(selectedUser.age)
                setPhoneNumber(selectedUser.phoneNumber)
                setDepartment(selectedUser.department.department)
                setPosition(selectedUser.position)
                setRole(selectedUser.role)
                console.log('selectedUser 보자: ', selectedUser);
            } 
            else {
                // 새 사원 추가 시 상태 초기화
                setUserId('');
                setPassword('');
                setUsername('');
                setGender('');
                setAge('');
                setPhoneNumber('');
                setDepartment('');
                setPosition('');
                setRole('');
            }
        }, [isOpen, selectedUser]);
            
        if (!isOpen)
            
        return null;    // 모달이 열려있지 않으면 렌더링 X
        const handleSubmit = async (e) => {
            e.preventDefault()
    
            const selectedDepartment = departments.find(dept => dept.department === department);
    
            const updateUser = {
                userId,
                password,
                username,
                gender,
                age,
                phoneNumber,
                department: selectedDepartment,
                position,
                role
            }
            try {
                const response = await axios.put(`http://localhost:8088/user/updateMaster/${selectedUser.id}`, updateUser, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
          
                if (response.status === 200) {
                  console.log("사원 수정 성공:", response.data);
                  alert("사원 수정 성공")
                  onClose();
                }
              } catch (error) {
                console.error("사원 수정 실패:", error);
                alert("사원 수정 실패");
              }
            };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>사원 수정</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup3}>
                        <label className={styles.label}>아이디</label>
                        <input
                            className={styles.input1}
                            type='text'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder='아이디'
                        />
                    </div>
                    <div className={styles.formGroup4}>
                        <label className={styles.label}>비밀번호</label>
                        <input 
                            className={styles.input1}
                            type='text'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='비밀번호'
                        />
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>이름</label>
                        <input 
                            className={styles.input1}
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='유저 이름'
                        />
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>성별</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="남성"
                                    checked={gender === '남성'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={styles.radioInput}
                                />
                                남성
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="여성"
                                    checked={gender === '여성'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={styles.radioInput}
                                />
                                여성
                            </label>
                        </div>
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>나이</label>
                        <input 
                            className={styles.input1}
                            type='text'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder='ex) 20'
                        />
                    </div>
                    <div className={styles.formGroup4}>
                        <label className={styles.label}>전화번호</label>
                        <input 
                            className={styles.input1}
                            type='text'
                            value={phoneNumber}
                            placeholder='전화번호를 입력하세요 [ex) 01012345678]'
                            onChange={(e) => {
                                const value = e.target.value;
                                // 숫자만 입력 가능하도록 필터링
                                if (/^\d*$/.test(value)) {
                                    setPhoneNumber(value); // 상태 업데이트
                                }
                            }}
                        />
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>부서</label>
                        <select className={styles.select}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}>
                                
                            <option value="">선택</option>
                            {departments.map((dept) => (
                                <option key={dept.department} value={dept.department}>
                                    {dept.department}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>직급</label>
                        <select
                            className={styles.select}
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}>
                            <option value="">선택</option>
                            <option>사원</option>
                            <option>대리</option>
                            <option>선임</option>
                            <option>팀장</option>
                            <option>이사</option>
                        </select>
                    </div>
                    <div className={styles.formGroup2}>
                        <label className={styles.label}>권한</label>
                        <select
                            className={styles.select}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="">선택</option>
                            <option value="ROLE_USER">ROLE_USER</option>
                            <option value="ROLE_MASTER">ROLE_MASTER</option>
                        </select>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type='submit' className={styles.buttons}>수정</button>
                        <button type='button' className={styles.buttons} onClick={onClose}>닫기</button>
                    </div>
                </form>
            </div>   
        </div>
    );
};

export default EmployeeUpdate;